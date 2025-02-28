import { Response, Request } from "express"
import supabase from "../config/supabase";
import readline from "readline";
import { mapStore } from "../utils/maps";

interface Transaction {
    type: string;
    date: string;
    value: number;
    card: string;
    time: string;
}

interface Store {
    name: string;
    document: string;
    owner: string;
    transactions: Transaction[];
}

export function parseLine(line: string): { storeKey: string; transaction: Transaction; storeInfo: { name: string; document: string; owner: string } } {
    const storeName = line.substring(62, 81).trim();
    const storeDocument = line.substring(19, 30).trim();
    const storeOwner = line.substring(48, 62).trim();

    return {
        storeKey: `${storeName}-${storeDocument}-${storeOwner}`,
        transaction: {
            type: line.substring(0, 1).trim(),
            date: line.substring(1, 9).trim(),
            value: parseFloat(line.substring(9, 19).trim()) / 100,
            card: line.substring(30, 42).trim(),
            time: line.substring(42, 48).trim(),
        },
        storeInfo: {
            name: storeName,
            document: storeDocument,
            owner: storeOwner,
        },
    };
}

export const processTransactions = async (req: Request, res: Response) => {
    try {
        if (!req.body || req.body.length === 0) {
            return res.status(400).json({ message: "Arquivo vazio!" });
        }

        const buffer = req.body;
        const stream = require("stream");
        const readable = new stream.Readable();
        readable.push(buffer);
        readable.push(null);

        const rl = readline.createInterface({
            input: readable,
            output: process.stdout,
            terminal: false,
        });

        const storesMap = new Map<string, Store>();

        for await (const line of rl) {
            if (line.trim() && line.trim().length >= 73) {
                const { storeKey, transaction, storeInfo } = parseLine(line);

                if (!storesMap.has(storeKey)) {
                    storesMap.set(storeKey, {
                        name: storeInfo.name,
                        document: storeInfo.document,
                        owner: storeInfo.owner,
                        transactions: [],
                    });
                }

                storesMap.get(storeKey)?.transactions.push(transaction);
            }
        }

        const stores = Array.from(storesMap.values());

        const responseTransactions = await supabase
            .from('transactions')
            .delete()
            .neq('id', 0)
        if (responseTransactions.error) throw new Error(responseTransactions.error.message);

        const responseStores = await supabase
            .from('stores')
            .delete()
            .neq('id', 0)
        if (responseStores.error) throw new Error(responseStores.error.message);

        for (const store of stores) {
            const storeResponse = await supabase
                .from('stores')
                .insert({
                    "name": store.name,
                    "document": store.document,
                    "owner": store.owner
                })
                .select();

            if (storeResponse.error) throw new Error(storeResponse.error.message);

            for (const transaction of store.transactions) {
                await supabase
                    .from('transactions')
                    .insert({
                        "type": transaction.type,
                        "date": transaction.date,
                        "value": transaction.value,
                        "card": transaction.card,
                        "time": transaction.time,
                        "store_id": storeResponse.data[0].id
                    });
            }
        }

        const { data, error } = await supabase
            .from('stores')
            .select('*, transactions(*)')
            .order('id')

        if (error) throw new Error(error.message);

        return res.status(200).json(data.map((transaction: any) => mapStore(transaction)))

    } catch (error) {
        console.error("Erro ao processar arquivo:", error);
        return res.status(500).json({ message: "Erro ao processar arquivo" });
    }
}

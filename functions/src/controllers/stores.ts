import { Response, Request } from "express"
import supabase from "../config/supabase";
import { mapStore } from "../utils/maps";

export const getStores = async (req: Request, res: Response) => {

    try {
        const { data, error } = await supabase
            .from('stores')
            .select('*, transactions(*)')
            .order('id')

        if (error) throw new Error(error.message)

        res.status(200).json(data.map((store: any) => mapStore(store)))

    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const getStoresByDocument = async (req: Request, res: Response) => {

    try {
        const { document } = req.params
        
        const { data, error } = await supabase
            .from('stores')
            .select('*, transactions(*)')
            .eq('document', document)
            .order('id')

        if (error) throw new Error(error.message)

        res.status(200).json(data.map((store: any) => mapStore(store)))

    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const cleanStores = async (req: Request, res: Response) => {

    try {

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

        res.status(200).json({ message: "Lojas excluídas com sucesso!" });

    } catch (error: any) {
        console.log('error ->>> ', error)
        res.status(400).json({ message: error.message })
    }
}
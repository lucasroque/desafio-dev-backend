import { parseLine } from "../controllers/transactions";

describe("parseLine", () => {
    test("deve converter uma linha de texto em um objeto Transaction corretamente", () => {
        const line = "1202502280000014200345678901234753****3153120000Dono Exemplo  Loja Exemplo       ";

        const result = parseLine(line);

        console.log(result)

        expect(result).toEqual({
            storeKey: "Loja Exemplo-34567890123-Dono Exemplo",
            transaction: {
                type: "1",
                date: "20250228",
                value: 142,
                card: "4753****3153",
                time: "120000",
            },
            storeInfo: {
                name: "Loja Exemplo",
                document: "34567890123",
                owner: "Dono Exemplo",
            }
        });
    });
});

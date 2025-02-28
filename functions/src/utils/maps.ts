export const mapUser = (user: any): any => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        document: user.document,
        role: user.role
    }
}

export const mapStore = (store: any): any => {

    const transactions = store.transactions ? store.transactions.map((transaction: any) => mapTransaction(transaction)) : undefined
    const totalBalance = transactions.reduce((acc: any, transaction: any) => {
        return transactionType(transaction.type).nature === "+" 
            ? acc + transaction.value 
            : acc - transaction.value;
    }, 0);

    return {
        id: store.id,
        name: store.name,
        owner: store.owner,
        document: store.document,
        balance: totalBalance.toFixed(2),
        transactions: transactions,
    }
}

export const mapTransaction = (transaction: any): any => {
    return {
        id: transaction.id,
        type: transaction.type,
        value: transaction.value,
        card: transaction.card,
        date: transaction.date,
        time: transaction.time
    }
}

const transactionType = (type: string): { description: string, nature: string} => {
    const transactionTypes: Record<string, { description: string, nature: string}> = {
        1: { description: "Débito", nature: "+"},
        2: { description: "Boleto", nature: "-"},
        3: { description: "Financiamento", nature: "-"},
        4: { description: "Crédito", nature: "+"},
        5: { description: "Recebimento Empréstimo", nature: "+"},
        6: { description: "Vendas", nature: "+"},
        7: { description: "Recebimento TED", nature: "+"},
        8: { description: "Recebimento DOC", nature: "+"},
        9: { description: "Aluguel", nature: "-"}
    };

    return transactionTypes[type] || { description: "Tipo desconhecido", nature: ""};
}
export type TCategory = {
    id: string,
    name: string,
    emoji: string
    url: string
}

export type TExpenceObject = {
    amount: number,
    name: string,
    categoryID: string,
    accountID: string
}

export type TIncomeObject = {
    amount: number,
    name: string,
    accountID: string
}

export type TTransferObject = {
    amount: number,
    fromAccountID: string,
    toAccountID: string
}
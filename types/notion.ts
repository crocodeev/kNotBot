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

import { toDouleDimesionArray } from "./utils";

const createInlineKeyboard = (arr: any[], buttonsInRow: number) => {

    const createButton = (item: any) => {
        return {
            text: `${item.emoji} ${item.name}`,
            callback_data: item.url
        }    
    }

    const inlineKeyboard = toDouleDimesionArray(arr, createButton, buttonsInRow)

    return inlineKeyboard

}

export default createInlineKeyboard
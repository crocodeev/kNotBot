import { CustomContext, CustomConversation } from '../../customContextType';
import { getCategories, createExpence, isExpence } from '../../../models/money';
import { loadJsonFileSync } from "load-json-file";
import { TDatabasesIds } from "../../../types/config";
import createInlineKeyboard from '../../../utils/createInlineKeyboard';

const databases: TDatabasesIds = loadJsonFileSync('./settings/databases.json')

const expence = async (conversation: CustomConversation, ctx: CustomContext) => {

    if(ctx.message?.text === undefined) return

    ctx.expence = {}
    ctx.expence.amount = parseFloat(ctx.message.text)

    //request name
    await ctx.reply("Name it, please...")

    let data = await conversation.wait()
    ctx.expence.name = data.message?.text
    
    //request category
    const categories = await conversation.external(() => getCategories(databases.categories))
    let kb = createInlineKeyboard(categories, 2)

    await ctx.reply('Choose category', {
        reply_markup: {
            inline_keyboard: kb
        }
    })

    data = await conversation.wait()
    ctx.expence.categoryID = data.callbackQuery?.data
    
    //request account

    const accounts = await conversation.external(() => getCategories(databases.accounts))
    kb = createInlineKeyboard(accounts, 2)
    await ctx.reply('Choose account', {
        reply_markup: {
            inline_keyboard: kb
        }
    })

    data = await conversation.wait()
    ctx.expence.accountID = data.callbackQuery?.data
    
    //add expence to notion 
    
    await conversation.external(() => {
        if(isExpence(ctx.expence)){
            createExpence(ctx.expence)
        }else{
            throw new TypeError("ctx.expence comply with TExpence type")
        }
    }) //type protection?
    await ctx.reply('Succefully added')
    return
}
 
export { expence }
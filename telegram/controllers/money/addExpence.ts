import { ADD_EXPENCE } from '../../scenesConstants';
import { CustomContext, CustomConversation } from '../../customContextType';
import { getCategories, createExpence, retrieveDatabase } from '../../../controllers/money';
import { loadJsonFileSync } from "load-json-file";
import { TDatabasesIds } from "../../../types/config";
import { TExpenceObject } from "../../../types/notion";
import createInlineKeyboard from '../../../utils/createInlineKeyboard';

const databases: TDatabasesIds = loadJsonFileSync('./settings/databases.json')

const addExpence = async (conversation: CustomConversation, ctx: CustomContext) => {

    if(ctx.message?.text === undefined) return

    ctx.expence = {}
    ctx.expence.amount = parseInt(ctx.message.text)

    //request name
    await ctx.reply("Name it, please...")

    let data = await conversation.wait()
    ctx.expence.name = data.message?.text
    
    //request category
    const categories = await getCategories(databases.categories)
    let kb = createInlineKeyboard(categories, 2)

    await ctx.reply('Choose category', {
        reply_markup: {
            inline_keyboard: kb
        }
    })

    data = await conversation.wait()
    ctx.expence.categoryID = data.callbackQuery?.data
    console.log(ctx.expence);
    
    //request account

    const accounts = await getCategories(databases.accounts)
    kb = createInlineKeyboard(accounts, 2)
    await ctx.reply('Choose account', {
        reply_markup: {
            inline_keyboard: kb
        }
    })

    data = await conversation.wait()
    ctx.expence.accountID = data.callbackQuery?.data
    
    //add expence to notion
    console.log(ctx.expence);
    
    await createExpence(ctx.expence as TExpenceObject, databases.expences) //type protection?
    await ctx.reply('Succefully added')
    return
}
 
export { addExpence }
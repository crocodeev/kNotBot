import { CustomContext, CustomConversation } from '../../customContextType';
import { getCategories, createIncome, isIncome } from '../../../models/money';
import { loadJsonFileSync } from "load-json-file";
import { TDatabasesIds } from "../../../types/config";
import createInlineKeyboard from '../../../utils/createInlineKeyboard';

const databases: TDatabasesIds = loadJsonFileSync('./settings/databases.json')

const income = async (conversation: CustomConversation, ctx: CustomContext) => {

    if(ctx.message?.text === undefined) return

    ctx.income = {}
    ctx.income.amount = parseFloat(ctx.message.text)

    //request name
    await ctx.reply("Name it, please...")

    let data = await conversation.wait()
    ctx.income.name = data.message?.text
    
    //request account

    const accounts = await conversation.external(() => getCategories(databases.accounts))

    let kb = createInlineKeyboard(accounts, 2)
    await ctx.reply('Choose account', {
        reply_markup: {
            inline_keyboard: kb
        }
    })

    data = await conversation.wait()
    ctx.income.accountID = data.callbackQuery?.data
    
    //add income to notion
    console.log(ctx.income);
    
    await conversation.external(() => {
        if(isIncome(ctx.income)){
            
            createIncome(ctx.income)
        }else{
            throw new TypeError("ctx.income comply with TExpence type")
        }
    }) //type protection?
    await ctx.reply('Succefully added')
    
    return
}
 
export { income }
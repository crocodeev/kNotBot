import { ADD_EXPENCE } from '../../scenesConstants';
import { CustomContext } from '../../customContextType';
import { Scenes, Context, Composer, Markup } from "telegraf";
import { getCategories, createExpence, retrieveDatabase } from '../../../controllers/money';
import { InlineKeyboardButton, InlineKeyboardMarkup, Message, Update } from 'telegraf/typings/core/types/typegram';
import { loadJsonFileSync } from "load-json-file";
import { TDatabasesIds } from "../../../types/config";
import { TExpenceObject } from "../../../types/notion";
import createInlineKeyboard from '../../../utils/createInlineKeyboard';

const databases: TDatabasesIds = loadJsonFileSync('./settings/databases.json')


const cbCategoryHandler = new Composer<CustomContext>()

cbCategoryHandler.on('callback_query', (ctx) => {
    ctx.scene.session.expence.categoryID = ctx.callbackQuery.data
    ctx.wizard.next()
})

const cbAccountHandler = new Composer<CustomContext>()

cbAccountHandler.on('callback_query', (ctx) => {
    ctx.scene.session.expence.accountID = ctx.callbackQuery.data
    ctx.wizard.next()
})5

const addExpence = new Scenes.WizardScene<CustomContext>(
    ADD_EXPENCE,
    //name request
    async (ctx) => {
        ctx.scene.session.expence = {}
        ctx.scene.session.expence.amount = parseFloat(ctx.message.text)
        await ctx.reply("Name it, please")
        ctx.scene.session.expence.name = ctx.message.text
        return ctx.wizard.next()
    },
    //request Category
    async (ctx) => {
        const categories = await getCategories(databases.categories)

        const kb = createInlineKeyboard(categories, 2)

        await ctx.reply("Select category...", {
            reply_markup: { 
                inline_keyboard: kb
            }
        })

        return ctx.wizard.next()
    },
    cbCategoryHandler,
    //request Account
    async (ctx) => {
        const accounts = await getCategories(databases.accounts)

        const kb = createInlineKeyboard(accounts, 2)

        await ctx.reply("Select category...", {
            reply_markup: { 
                inline_keyboard: kb
            }
        })

        return ctx.wizard.next()
    },
    cbAccountHandler,
    //create Expence
    async (ctx) => {
        console.log("create expence");
        
        await createExpence(ctx.scene.session.expence as TExpenceObject, databases.expences)
        await ctx.reply("Expence successfully added")
        return await ctx.scene.leave()
    }  
)

export { addExpence }
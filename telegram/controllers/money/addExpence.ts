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

const addExpence = new Scenes.WizardScene<CustomContext>(
    ADD_EXPENCE,
    //name request
    async (ctx) => {
        ctx.scene.session.expence = {}
        ctx.scene.session.expence.amount = parseFloat(ctx.message.text)
        await ctx.reply("Name it, please")
        ctx.scene.session.expence.name = ctx.message.text
        ctx.wizard.next()
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

        console.log(ctx.message);

        ctx.wizard.next()
    },
    //request Account
    async (ctx) => {
        
        ctx.wizard.next()
    },
    //create Expence
    async (ctx) => {
        
        ctx.scene.leave()
    }  
)

export { addExpence }
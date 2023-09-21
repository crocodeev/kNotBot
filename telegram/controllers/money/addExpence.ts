import { ADD_EXPENCE } from '../../scenesConstants';
import { CustomContext } from '../../customContextType';
import { Scenes, Context, Composer } from "telegraf";
import { getCategories, createExpence, retrieveDatabase } from '../../../controllers/money';
import { toDouleDimesionArray } from '../../../utils/utils';
import { InlineKeyboardButton, InlineKeyboardMarkup, Message, Update } from 'telegraf/typings/core/types/typegram';
import { loadJsonFileSync } from "load-json-file";
import { TDatabasesIds } from "../../../types/config";
import { TExpenceObject } from "../../../types/notion";

const databases: TDatabasesIds = loadJsonFileSync('./settings/databases.json')

const addExpence = new Scenes.WizardScene<CustomContext>(
    ADD_EXPENCE,
    async (ctx) => {
        ctx.scene.session.expence = {}
        ctx.scene.session.expence.amount = parseFloat(ctx.message.text)
        await ctx.reply("Name it, please")
        ctx.scene.session.expence.name = ctx.message.text
        ctx.wizard.next()
    },
    async (ctx) => {
        console.log(ctx.scene.session.expence);
        ctx.scene.leave()
    } 
)

export { addExpence }
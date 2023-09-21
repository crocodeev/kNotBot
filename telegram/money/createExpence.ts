import { Scenes, Context, Composer } from "telegraf";
import { getCategories, createExpence as addExpence, retrieveDatabase } from '../../controllers/money';
import { toDouleDimesionArray } from '../../utils/utils';
import { InlineKeyboardButton, InlineKeyboardMarkup, Message, Update } from 'telegraf/typings/core/types/typegram';
import { loadJsonFileSync } from "load-json-file";
import { TDatabasesIds } from "../../types/config";
import { TExpenceObject } from "../../types/notion";
import { CREATE_EXPENCE } from "../scenesConstants";

const databases: TDatabasesIds = loadJsonFileSync('./settings/databases.json')

interface IContextExpence extends Context {

    expence: Partial<TExpenceObject>;

	scene: Scenes.SceneContextScene<IContextExpence, Scenes.WizardSessionData>;
	// declare wizard type
	wizard: Scenes.WizardContextWizard<IContextExpence>;

}

const nameHandler = new Composer<IContextExpence>()

nameHandler.use(async (ctx) => {

    ctx.expence = {}
    ctx.expence.amount = parseInt(ctx.message.text)

    ctx.wizard.next()
})

const createExpence = new Scenes.WizardScene(
	CREATE_EXPENCE,
    //request name
	async (ctx) => {

        ctx.wizard.state.expence = {} as Partial<TExpenceObject>
        ctx.wizard.state.expence.amount = parseFloat(ctx.message.text)

		await ctx.reply("Please, name it...")
		return ctx.wizard.next();
	},
    //requesr category
	async ctx => {

        ctx.wizard.state.expence.name = ctx.message.text
		const categories = await getCategories(databases.categories)

        const inlineKeyboardCategories = toDouleDimesionArray(categories, (item) => {

            return {
                text: `${item.emoji} ${item.name}`,
                callback_data: item.url
            }   
        }, 2)

        await ctx.reply("Please, choose expence category", {
            reply_markup: {
                inline_keyboard: inlineKeyboardCategories
            }
        })

		return ctx.wizard.next();
	},
    //request account
	async ctx => {

        ctx.wizard.state.expence.categoryID = ctx.update.callback_query.data

        const accounts = await getCategories(databases.accounts)

        const inlineKeyboardAccounts = toDouleDimesionArray(accounts, (item) => {

            return {
                text: `${item.emoji} ${item.name}`,
                callback_data: item.url
            }   
        }, 2)
        
        await ctx.reply("Please, choose expence category", {
            reply_markup: {
                inline_keyboard: inlineKeyboardAccounts
            }
        })

		return await ctx.wizard.next();
	},
    //final decision
    async ctx => {
		
        ctx.wizard.state.expence.accountID = ctx.update.callback_query.data

        await addExpence(ctx.wizard.state.expence, databases.expences)

        await ctx.reply("Expence success added to database")

		return await ctx.scene.leave()
	}
);



    /*
    const categories = await getCategories(databases.categories)

    const inlineKeyboardCategories = toDouleDimesionArray(categories, (item) => {

        return {
            text: `${item.emoji} ${item.name}`,
            callback_data: item.id
        }   
    }, 2)

    ctx.reply("Please, choose expence category", {
        reply_markup: {
            inline_keyboard: inlineKeyboardCategories
        }
    })

    bot.on('callback_query', async (ctx) => {

        console.log(ctx.callbackQuery.data)
        
    })

    const accounts = await getCategories(databases.accounts)
    */

export default createExpence
import { Scenes, Telegraf, Markup, session } from 'telegraf'
import { message } from 'telegraf/filters'
import { config } from 'dotenv';
import createExpence from './money/createExpence';
import { isDecimalNumber } from '../utils/utils';
import { CREATE_EXPENCE } from './scenesConstants';

config({
    path: './settings/.env'
})

if(!process.env.TELEGRAM_TOKEN){
    console.log("TOKEN NOT PROVIDED");
    process.exit(-1)
}

const superWizard = new Scenes.WizardScene(
	"super-wizard",
	async ctx => {
		await ctx.reply(
			"Step 1",
			Markup.inlineKeyboard([
				Markup.button.url("❤️", "http://telegraf.js.org"),
				Markup.button.callback("➡️ Next", "next"),
			]),
		);
		return ctx.wizard.next();
	},
	async ctx => {
		await ctx.reply("Step 3");
		return ctx.wizard.next();
	},
	async ctx => {
		await ctx.reply("Step 4");
		return ctx.wizard.next();
	},
	async ctx => {
		await ctx.reply("Done");
		return await ctx.scene.leave();
	},
);

const bot = new Telegraf<Scenes.WizardContext>(process.env.TELEGRAM_TOKEN, {
    handlerTimeout: Infinity
})

const stage = new Scenes.Stage<Scenes.WizardContext>([superWizard, createExpence]);

bot.use(session());
bot.use(stage.middleware());

bot.on(message('text'), Scenes.Stage.enter(CREATE_EXPENCE))

export default bot
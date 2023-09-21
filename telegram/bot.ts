import { Scenes, Telegraf, Markup, session, Context, Composer } from 'telegraf'
import { message } from 'telegraf/filters'
import { config } from 'dotenv';
import createExpence from './money/createExpence';
import { isDecimalNumber } from '../utils/utils';
import { ADD_EXPENCE, CREATE_EXPENCE } from './scenesConstants';
import { CustomContext } from './customContextType';
import { addExpence } from './controllers/money/addExpence';

config({
    path: './settings/.env'
})

if(!process.env.TELEGRAM_TOKEN){
    console.log("TOKEN NOT PROVIDED");
    process.exit(-1)
}

const bot = new Telegraf<CustomContext>(process.env.TELEGRAM_TOKEN, {
    handlerTimeout: Infinity
})
const stage = new Scenes.Stage<CustomContext>([addExpence]);

bot.use(session());
bot.use(stage.middleware());


bot.hears(/^[+-]?\d+(\.\d+)?$/, Scenes.Stage.enter<CustomContext>(ADD_EXPENCE))
/**
 * expence
 * - command /expence
 * - number if number 
 * expence or income
 */

export default bot
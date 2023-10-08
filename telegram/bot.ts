import { config } from 'dotenv';
import { Bot, HttpError, GrammyError } from 'grammy';
import { session } from '@grammyjs/conversations/out/deps.node';
import {
    createConversation,
    conversations
  } from "@grammyjs/conversations";
import { CustomContext } from './customContextType';
import { expence } from './controllers/money/expence';
import { ADD_EXPENCE } from './scenesConstants';


config({
    path: './settings/.env'
})

if(!process.env.TELEGRAM_TOKEN){
    console.log("TOKEN NOT PROVIDED");
    process.exit(-1)
}

const bot = new Bot<CustomContext>(process.env.TELEGRAM_TOKEN)

bot.use(session({
    initial() {
      // return empty object for now
      return {};
    },
  }))

bot.use(conversations())

bot.use(createConversation(expence, ADD_EXPENCE))

bot.hears(/^[+-]?\d+(\.\d+)?$/, async (ctx) => {
    
    await ctx.conversation.enter(ADD_EXPENCE)
})

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

export default bot
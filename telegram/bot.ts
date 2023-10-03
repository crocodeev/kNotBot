import { config } from 'dotenv';
import { Bot } from 'grammy';
import { session } from '@grammyjs/conversations/out/deps.node';
import {
    createConversation,
    conversations
  } from "@grammyjs/conversations";
import { CustomContext } from './customContextType';
import { addExpence } from './controllers/money/addExpence';
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

bot.use(createConversation(addExpence, ADD_EXPENCE))

bot.hears(/^[+-]?\d+(\.\d+)?$/, async (ctx) => {
    
    await ctx.conversation.enter(ADD_EXPENCE)
})

export default bot
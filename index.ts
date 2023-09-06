import { config } from 'dotenv'
import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'

config({
    path: './settings/.env'
})

if(!process.env.TELEGRAM_TOKEN){
    console.log("TOKEN NOT PROVIDED");
    process.exit(-1)
}

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, {
    handlerTimeout: Infinity
})

bot.start( async (ctx) => {
    await ctx.reply('Hello')
})

bot.on(message('text'), (ctx) => ctx.reply('Hello again'))

bot.launch()
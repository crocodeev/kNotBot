import { config } from 'dotenv';
import { Bot } from 'grammy';

config({
    path: './settings/.env'
})

if(!process.env.TELEGRAM_TOKEN){
    console.log("TOKEN NOT PROVIDED");
    process.exit(-1)
}

const bot = new Bot(process.env.TELEGRAM_TOKEN)

bot.on('message', (ctx) => {
    ctx.reply("Got message")
})

export default bot
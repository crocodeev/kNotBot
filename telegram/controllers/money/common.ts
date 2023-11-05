import { CustomContext, CustomConversation } from '../../customContextType';
import { INCOME, EXPENCE, COMMON } from '../../scenesConstants';
import { expence } from './expence';
import { income } from './income';

const common = async (conversation: CustomConversation, ctx: CustomContext) => {

    if(ctx.message?.text === undefined) return

    const kb = [[
        {
            text: `💸 ${INCOME}`,
            callback_data: INCOME
        },
        {   
            text: `💳 ${EXPENCE}`,
            callback_data: EXPENCE
        }
    ]]

    await ctx.reply('What is it?', {
        reply_markup: {
            inline_keyboard: kb
        }
    })

    const data = await conversation.wait()

    switch (data.callbackQuery?.data) {
        case INCOME:
            await income(conversation, ctx)
            return
        case EXPENCE:
            await expence(conversation, ctx)
            return
        default:
            return;
    }
    
}
 
export { common }
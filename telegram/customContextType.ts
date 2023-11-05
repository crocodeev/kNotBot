import { TExpenceObject, TIncomeObject, TTransferObject } from "../types/notion";
import { Context } from 'grammy';
import { type Conversation,
         type ConversationFlavor,
} from "@grammyjs/conversations";

interface ExtendedContext extends Context {
    expence: Partial<TExpenceObject>
    income: Partial<TIncomeObject>
    transfer: Partial<TTransferObject>
}

export type CustomContext = ConversationFlavor<ExtendedContext>;
export type CustomConversation = Conversation<CustomContext>;  



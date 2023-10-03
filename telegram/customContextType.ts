import { TExpenceObject } from "../types/notion";
import { Context } from 'grammy';
import { type Conversation,
         type ConversationFlavor,
} from "@grammyjs/conversations";

interface ExtendedContext extends Context {
    expence: Partial<TExpenceObject>
}

export type CustomContext = ConversationFlavor<ExtendedContext>;
export type CustomConversation = Conversation<CustomContext>;  



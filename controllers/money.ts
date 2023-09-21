import { text } from "telegraf/typings/button";
import notion from "../notion/notion"
import { TCategory, TExpenceObject } from "../types/notion";

/**
 * get expence categories or account
 */

const getCategories = async (database_id: string): Promise<Array<TCategory>> => {

    const raw = await notion.databases.query({
        database_id: database_id,
        filter: {
            title: {
                is_not_empty: true
            },
            property: "Name"
        }
    })

    const result = raw.results.map((item) => { 
        return { id: item.id,
                 name: item.properties.Name.title[0].plain_text,
                 emoji: item.icon.emoji,
                 url: item.url.split('-').at(-1) }})

    return result
    
}

const retrieveDatabase = async (databaseID: string) => {

    return await notion.databases.retrieve({
        database_id: databaseID
    })
}

const createExpence = async (expenceObject: TExpenceObject, databaseId: string): Promise<void> => {
    
    await notion.pages.create({

        parent: {
            database_id: databaseId
        },
        properties: {
            Name: {
                title: [
                  {
                    text: {
                      content: expenceObject.name
                    },
                  },
                ],
              },
            Amount: {
                number: expenceObject.amount
            },
            Account: {
                relation: [
                    {
                        id: expenceObject.accountID
                    }
                ]
            },
            Category: {
                relation: [
                    {
                        id: expenceObject.categoryID
                    }
                ]
            }
        }
    })
}


export { getCategories, createExpence, retrieveDatabase }
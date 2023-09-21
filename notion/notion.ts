import { config } from 'dotenv'
import { Client } from '@notionhq/client'

config({
    path: './settings/.env'
})

console.log(process.env.NOTION_TOKEN);

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

const getData = async (databaseId: string) => {

}


export default notion


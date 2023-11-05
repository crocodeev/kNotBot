import { config } from 'dotenv'
import { Client } from '@notionhq/client'

config({
    path: './settings/.env'
})


const notion = new Client({
    auth: process.env.NOTION_TOKEN
})



export default notion


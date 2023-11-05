### KNOTBOT

Telegram bot, which  based on awesome grammy library, which allow to
* log your expences in notion template 
https://chalk-syrup-1e1.notion.site/Money_Template-3f897d95eb8a42709bdc17e55794e81e

## deploy

* create settings folder with two files
    * .env

    ```
    TELEGRAM_TOKEN=YOUR_TG:TOKEN
    NOTION_TOKEN=YOUR_NOTION_SECRET
    ```

    * databases.json 

    ```
    {
    "categories": "database id  of expense categories",
    "accounts": "database id of payment accounts",
    "expences": "database id of expences",
    "incomes": "database id of incomes"
    }
    ```

* 
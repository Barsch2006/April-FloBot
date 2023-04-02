# First-April-Version of [FloBot](https://github.com/Mickhat/FloBot)

A version of a Discord-Moderation-Bot in Typescript build to prank the members of the Server

## Development

To setup your bot, you have to copy the `env.example` to `.env` and set your TOKENs and IDs:

```INI
BOT_TOKEN=YOURTOKEN
APPLICATION_ID=YOUR_APPLICATION_ID
TOGGLE_ROLES= <ids von rollen, die sich Nutzer selbst geben können. Mit, getrennt. Maximal 5 (weil man nicht mehr buttons in eine Nachricht machen kann)>
DB_PATH=<path to sqlite3 db>
REPORT_CHANNEL_ID= <channel, in den Reports geschickt werden sollen>
TICKET_SUPPORTER= <id der Rolle, die jedem Ticket hinzugefügt wird>
APRIL= <Channel to Log the Actions of the users on April-Commands>
```

You can also configure the logging behavior in `logging.json`.
You schould also change the JSON in the `startApril.ts` and `stopApril.ts`

## npm commands

The bot is tested with Node Version 18.x

```bash
npm run start # this starts the bot as in production
```

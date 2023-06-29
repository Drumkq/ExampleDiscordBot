# ExampleDiscordBot
Example giveaway universal discord bot written in typescript

# How to set up
Rename file ".env.schema" to ".env" <br />
You only need to configure 4 fields for the bot to work properly:
1. In the TOKEN field, enter your bot's secret token;
2. In the ID field, enter your bot's client ID;
3. In the PREFIX field, enter the prefix you want for your bot;
4. In the DB_CON_STR field enter the MongoDB database address.

# Commands
All commands work only on the discord server
## Slash commands
```
giveaway <name> <total winners> - creates a new draw on the server
delete-giveaway <name> - deletes a giveaway
finish-giveaway <name> - completes the giveaway
join-giveaway <name> - giveaway name
```
## Text commands
```
ping - replies "pong"
```

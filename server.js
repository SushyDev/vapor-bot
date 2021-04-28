require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const colors = require('colors');
const config = JSON.parse(fs.readFileSync('./files/config.json', 'utf8'));

// ! Ready = when the bot starts execute this code
client.on('ready', () => {
    console.log('[Client] Bot is ready'.red);
    initializeCommands();
});

// ! On message event
client.on('message', async (message) => {
    // ? If the message starts with the prefix => run the command
    if (message.content.startsWith(config.prefix)) runCommand(message);
});

// ! Initializes all commands
function initializeCommands() {
    console.log('[Initializer] Initializing commands'.brightYellow);
    client.commands = new Discord.Collection();
    const commands = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
    console.log('[Initializer] Initialized commands'.red);
}

// ! Runs the command according to what is typed
function runCommand(message) {
    // ? Format message and split
    const commandMessage = message.content.slice(config.prefix.length).toLowerCase().split(' ');
    // ? First split is actual command
    const command = commandMessage[0];
    // ? Arguements array is created
    let messageArgs = [];

    // * If there is arguements then add all to the messageArgs array
    if (commandMessage.length > 1) for (let arg = 1; arg < commandMessage.length; arg++) messageArgs.push(commandMessage[arg]);

    // ! Block if invalid
    if (message.author.bot || message.author.id != '655865411119611904' || !client.commands.has(command)) return;

    console.log(`[Handler] Recieved ${command} command with arguements: ${messageArgs}`.blue);

    message.delete();

    // ? Execute command
    client.commands.get(command).execute(message, messageArgs, {client, config});
}

// ! Login to the BOT
client.login(process.env.TOKEN);

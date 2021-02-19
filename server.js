const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = JSON.parse(fs.readFileSync('./files/config.json', 'utf8'));

// ! Ready = when the bot starts execute this code
client.on('ready', () => {
  console.log('Bot is ready');
  initializeCommands();
});

client.on('message', async (message) => {
  // ! If the message starts with the prefix => run the command
  if (message.content.startsWith(config.prefix)) runCommand(message);
});

// ! Initializes all commands
function initializeCommands() {
  console.log('Initializing commands');
  client.commands = new Discord.Collection();
  const commands = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
  for (const file of commands) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }
}

// ! Runs the command according to what is typed
function runCommand(message) {
  let command = message.content.slice(config.prefix.length).toLowerCase();

  if (message.author.bot || message.author.id != '655865411119611904' || !client.commands.has(command)) return;

  console.log(`Recieved ${command} command`);

  client.commands.get(command).execute(message, { client, config });
}
client.login(process.env.TOKEN);


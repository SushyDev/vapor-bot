module.exports = {
  name: 'list',
  description: 'List all commands',
  execute(message, args) {
    const exampleEmbed = {
      color: 0x0099ff,
      title: 'Help',
      description: 'Here is a list of commands',
      fields: [
        getCommandList(args.client.commands)
      ],
      timestamp: new Date(),

    };
    message.channel.send({ embed: exampleEmbed });
  },
};

const getCommandList = (commands) => commands.map(x => ({name: x.name, value: `${x.description}`}))

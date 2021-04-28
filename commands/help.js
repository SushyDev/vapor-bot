module.exports = {
    name: 'help',
    description: 'List all commands',
    execute(message, args, data) {
        // ? Format the commands list                              // ? Make name first letter Uppercase            // ? Format description
        const getCommandList = (commands) => commands.map((x) => ({name: x.name[0].toUpperCase() + x.name.slice(1), value: `${x.description}\nUsage: \`${data.config.prefix + x.name}\``}));

        // ? Create the embed
        const messageEmbed = {
            color: 0x0099ff,
            title: 'Help',
            description: 'Here is a list of commands',
            fields: [getCommandList(data.client.commands)],
            timestamp: new Date(),
        };
        message.channel.send({embed: messageEmbed});
    },
};

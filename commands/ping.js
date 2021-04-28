module.exports = {
    name: 'ping',
    description: 'Runs ping command',
    execute(message, args, data) {
        message.channel.send('PONG');
    },
};

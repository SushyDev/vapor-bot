module.exports = {
    name: 'ping',
    description: 'Runs ping command',
    execute(message, args) {
        console.log(this, message.content)
        message.channel.send('PONG')
        return;
    }
}
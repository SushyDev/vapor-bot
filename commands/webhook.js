module.exports = {
    name: 'webhook',
    description: 'Testing Discord.js webhooks',
    execute(message, args, data) {
        (async () => {
            const webhookTitle = `${message.guild.name} - Chatter`;
            const webhooks = await message.guild.fetchWebhooks();
            const webhook = webhooks.find((webhook) => webhook.name === webhookTitle);

            webhook ? sendWebhook(webhook) : missingWebhook(webhookTitle);
        })();

        // ! When the webhook doesn't exist then create it
        function missingWebhook(webhookTitle) {
            message.channel
                .createWebhook(webhookTitle)
                .then((webhook) => sendWebhook(webhook))
                .catch((error) => message.channel.send(`Error occured creating webhook: \`\`\`${error}\`\`\``));
        }

        function sendWebhook(webhook) {
            const userID = args[0].startsWith('<@' || '<@!') && args[0].endsWith('>') ? args[0].slice(2, -1).replace('!', '') : message.author.id;
            const messageContent =
                userID == message.author.id
                    ? args.map((word) => `${word}`).join(' ')
                    : args
                          .slice(1)
                          .map((word) => `${word}`)
                          .join(' ');

            // # Edit webhook to current channel then send the message
            webhook
                .edit({
                    channel: message.channel.id,
                })
                .then(() =>
                    webhook.send(messageContent, {
                        username: message.guild.members.cache.get(message.member.id).nickname ?? message.guild.members.cache.get(message.member.id).user.username,
                        avatarURL: message.guild.members.cache.get(userID).user.avatarURL(),
                    })
                );
        }
    },
};

//! Make this a component to easily use webhooks for the bot

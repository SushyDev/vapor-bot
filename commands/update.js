module.exports = {
    name: 'update',
    description: 'Update the bot details',
    execute(message, args, data) {
        const config = data.config;
        const client = data.client;

        message.channel.send('Updating bot data').then((thisMessage) => {
            // # Update avatar
            const updateAvatar = async (avatar) => await client.user.setAvatar(avatar);
            const updateUsername = async (username) => await client.user.setUsername(username);
            const updateStatus = async (status) => await client.user.setStatus(status);
            const updatePresense = async (activityName, activityType) => await client.user.setActivity(activityName, activityType);

            updateAvatar(config.avatar)
                .then(() => {
                    console.log('Avatar: success');
                    message.channel.send(`Updated Avatar`);
                })
                .catch((error) => {
                    console.log('Avatar: error');
                    message.channel.send(`\`Error updating avatar:\` ${error.toString().split('avatar: ').pop()}`);
                });

            // # Update username
            updateUsername(config.username)
                .then(() => {
                    console.log('Username: success');
                    message.channel.send(`Updated Username`);
                })
                .catch((error) => {
                    console.log('Username: error');
                    message.channel.send(`\`Error updating username:\` ${error.toString().split('username: ').pop()}`);
                });

            // # Update status
            updateStatus(config.status)
                .then(() => {
                    console.log('Status: success');
                    message.channel.send(`Updated status`);
                })
                .catch((error) => {
                    console.log('Status: error');
                    message.channel.send(`\`Error updating status:\` ${error.toString().split('status: ').pop()}`);
                });

            // # Update activity
            updatePresense(config.activityName, {type: config.activityType})
                .then(() => {
                    console.log('Presense: success');
                    message.channel.send(`Updated presense`);
                })
                .catch((error) => {
                    console.log('Presense: error');
                    message.channel.send(`\`Error updating presense:\` ${error.toString().split('presense: ').pop()}`);
                });
        });
    },
};

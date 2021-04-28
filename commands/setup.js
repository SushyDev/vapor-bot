module.exports = {
    name: 'setup',
    description: 'Configure the server',
    execute(message, args, data) {
        initializeRoles(message);

        function initializeRoles(message) {
            const requiredRoles = ['Developer', 'Bot Perms', 'Admin', 'Moderator', 'Server Booster', 'Bots', 'Trusted', 'Verified', 'Muted', 'Member', '🔔 Updates', '📨 Info', 'fake role', 'another fake role'];
            const reactionEmojis = ['✅', '❌'];

            let found = -1;

            const checkRoles = requiredRoles.map((roleName) => message.guild.roles.cache.find((role) => role.name === roleName) ?? roleName);

            checkRoles.forEach((role, checked) => {
                // ? When everything is checked, tell user if missing roles
                role.name ? forFoundRoles(role) : forNewRoles(role);
                if (checked == requiredRoles.length - 1) found == checked ? message.channel.send('All roles found!') : message.channel.send(`Missing \`${checked - found}\` role(s)`);
            });

            function forFoundRoles(role) {
                found++;
            }

            function forNewRoles(roleName) {
                console.log(`MISSING ${roleName}`);

                // # Send message asking question
                message.channel.send(`Do you want to create the \`${roleName}\` role?`).then((botMessage) => {
                    // # React with emojis
                    reactionEmojis.map((emoji) => botMessage.react(emoji));

                    // ? await emoji reaction
                    awaitReactions(botMessage, message, roleName);
                });

                // # Await question answer
                function awaitReactions(botMessage, userMessage, roleName) {
                    // ? Check if reaction is valid
                    const filter = (reaction, user) => {
                        if (user.id != userMessage.author.id && user.id != botMessage.author.id) message.channel.send(`<@${user.id}> is not authorized to perform this action`);
                        return reactionEmojis.includes(reaction.emoji.name) && user.id == userMessage.author.id;
                    };

                    // ? Wait for reaction on the message
                    botMessage
                        .awaitReactions(filter, {max: 1, time: 60000, errors: ['time']})
                        .then((collected) => {
                            const reaction = collected.first();

                            // # Remove reactions on message
                            botMessage.reactions.removeAll().catch((error) => console.error(`Failed to clear reactions: ${error}`));

                            // # On yes : no
                            reaction.emoji.name === reactionEmojis[0] ? createNewRole(botMessage, roleName) : botMessage.edit(`Rejected: Not creating the \`${roleName}\` role`);
                        })
                        // # On error
                        .catch(() => {
                            message.channel.send('Error: `No reaction in time`');
                            botMessage.delete();
                        });
                }

                // # When answered is yes
                function createNewRole(botMessage, roleName) {
                    botMessage.edit(`Creating the \`${roleName}\` role`).then(() => {
                        // ? Create role and edit message once created
                        message.guild.roles.create({data: {name: roleName, permissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS']}}).then((role) => botMessage.edit(`<@&${role.id}> role created with ID: \`${role.id}\``));
                    });
                }
            }
        }
    },
};

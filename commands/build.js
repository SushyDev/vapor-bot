module.exports = {
    name: 'build',
    description: 'Build HTML',
    async execute(message, args, data) {
        const express = require('express');
        const app = express();
        const port = 3000;

        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        const server = await app.listen(port);
        console.log(`Example app listening at http://localhost:${port}`);

        setTimeout(() => {
            server.close();
            console.log('Server died');
        }, 5000);
    },
};

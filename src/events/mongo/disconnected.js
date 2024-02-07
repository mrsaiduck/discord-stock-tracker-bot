module.exports = {
    name: 'disconnecting',
    async execute(client) {
        const chalk = await import('chalk');

        console.log(chalk.default.red('[Database Status]: Disconnected.'));
    },
};

module.exports = {
    name: 'connecting',
    async execute(client) {
        const chalk = await import('chalk');

        console.log(chalk.default.cyan('[Database Status]: Connecting...'));
    },
};

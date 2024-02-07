module.exports = {
    name: 'connected',
    async execute(client) {
        const chalk = await import('chalk');

        console.log(chalk.default.green('[Database Status]: Connected.'));
    },
};

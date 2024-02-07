module.exports = {
    name: 'err',
    async execute(err) {
        const chalk = await import('chalk');

        console.log(
            chalk.default.red(
                `An error occured with the database connection:\n${err}`
            )
        );
    },
};

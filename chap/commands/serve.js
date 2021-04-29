const child = require('child_process');
const path = require('path');
const chalk = require('chalk');


exports.command = 'serve';
exports.desc = 'Start dashboard service';
exports.builder = yargs => {
    yargs.options({
    });
};


exports.handler = async argv => {
    const {  } = argv;

    (async () => {

        await run(  );

    })();

};



async function run() {

    console.log(chalk.greenBright('Starting dashboard service...'));

    const www = require('../dashboard/bin/www');

    
}

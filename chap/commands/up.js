const child = require('child_process');
const path = require('path');
const fs = require('fs');

const si = require('systeminformation');
const chalk = require('chalk');

const sshSync = require('../lib/ssh');

exports.command = 'up';
exports.desc = 'Provision experiment infrastructure';
exports.builder = yargs => {
    yargs.options({
        privateKey: {
            describe: 'Install the provided private key on the configuration server',
            type: 'string'
        }
    });
};


exports.handler = async argv => {
    const { privateKey } = argv;

    (async () => {

        await run( privateKey );

    })();

};

async function run(privateKey) {

    // let ip = getIPAddress();
    // console.log(chalk.greenBright(`Setting host network as ${ip}...`));
    // fs.writeFileSync(path.join(__dirname, "../../chaos/ip.txt"), ip);

    console.log(chalk.greenBright('Provisioning control server...'));
    let result = child.spawnSync(`bakerx`, `run --ip 192.168.44.102 --sync bluecanary chaos`.split(' '), 
        {shell:true, stdio: 'inherit', cwd: path.join(__dirname, "../../chaos")} );
    if( result.error ) { console.log(result.error); process.exit( result.status ); }

    spawnForeverProcess('vagrant@192.168.44.102');

    console.log(chalk.greenBright('Provisioning green canary server...'));
    result = child.spawnSync(`bakerx`, `run --ip 192.168.66.108 --sync greencanary chaos`.split(' '), 
        {shell:true, stdio: 'inherit', cwd: path.join(__dirname, "../../chaos")} );
    if( result.error ) { console.log(result.error); process.exit( result.status ); }

    spawnForeverProcess('vagrant@192.168.66.108');

}

function spawnForeverProcess(host)
{
    let winCmd = `"forever stopall && forever start /app/index.js"`;
    let macCmd = `'forever stopall && forever start /app/index.js'`;

    let result = null;
    if( process.platform=='win32')
        result = sshSync(winCmd, host);
    else { result = sshSync(macCmd, host);}
    if( result.error ) { console.log(result.error); process.exit( result.status ); }
}

function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
      var iface = interfaces[devName];
  
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
          return alias.address;
      }
    }
  
    return '0.0.0.0';
  }
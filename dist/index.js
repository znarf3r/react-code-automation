'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var clear = _interopDefault(require('clear'));
var commander = _interopDefault(require('commander'));
var emoji = _interopDefault(require('node-emoji'));
var configStack = require('config-stack');
var fs = _interopDefault(require('fs'));
var shell = _interopDefault(require('shelljs'));
var inquirer = _interopDefault(require('inquirer'));
var c = _interopDefault(require('ansi-colors'));

var strings = {
    infoBanner: "\n\n          Automate all the things! :fire: \n\n          :sparkles:  This CLI is aimed to automate react code generation when using some widely used libraries :sparkles: \n\n          Lets start! ... :rocket: \n\n",
};

// generals
var error = function (message) { return console.log(c.red(message)); };

var readConfigFromPathParam = function (path) {
    if (typeof path === 'undefined') {
        error("no path to config file was given \n please specify a path '../path/to/config'");
        process.exit(1);
    }
    if (shell.test('-f', path)) {
        // @ts-ignore
        var rawConfig = fs.readFileSync(path, 'utf8');
        var jsonConfig = JSON.parse(rawConfig);
        var automationTypes = jsonConfig.automation.types;
        // console.log(automationTypes)
        // const config = {}
        // configStack.loadFile(path)
        // configStack.bindObject(config)
        // const automationConfig = configStack.getObject('automation')
        if (automationTypes && automationTypes.length > 0) {
            // @ts-ignore
            var typeChoices = Object.values(automationTypes).map(function (item) { return item.type; });
            var question = {
                name: 'AUTOMATION_TYPE',
                type: 'list',
                choices: typeChoices,
            };
            // @ts-ignore
            return inquirer.prompt(question);
            // console.log(jsonConfig.automation.types)
            // const {
            //   automation: { types: automationTypes },
            // } = automationConfig
            // console.log(
            //   // @ts-ignore
            //   Object.values(automationTypes).map(item => item.type)
            //   // automationTypes.reduce((acc, item) => (acc.push(item['type']), [])
            // )
        }
    }
    else {
        error("unable to locate file at " + path);
        process.exit(1);
    }
};
var configActions = {
    readConfigFromPathParam: readConfigFromPathParam,
};

// configuration
var packageJson = require('../package.json');
// constants
var log = console.log;
// clear to top if possible
clear();
// general info
log(emoji.emojify(strings.infoBanner));
// .yml, .yaml, .json, .json5, .hjson, toml are supported by configStack
configStack.loadFile(process.cwd() + "/package.json");
var dependencies = configStack.get('dependencies');
var meetsReactDependency = Object.keys(dependencies).includes('react');
// if we have no react in dependencies we bail
if (!meetsReactDependency) {
    log(emoji.emojify('This is not a react project! :disappointed:'));
    log(emoji.emojify('Please install React or run this tool on a project'));
    log(emoji.emojify('that was created with create-react-app, more info here https://github.com/facebook/create-react-app'));
    process.exit();
}
var program = new commander.Command(Object.keys(packageJson.bin)[0]);
program
    .version(packageJson.version)
    .description('A CLI to help automate repetitive boilerplate in react projects')
    .option('-c, --config <path>', 'Enter the path where to read the config file', configActions.readConfigFromPathParam);
// .action(path => {
//   configStack.loadFile(path)
// })
// .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
// .option('-T, --no-tests', 'ignore test hook')
// program
//   .command('setup [mode]')
//   .description('run setup for your react project')
//   .option('-m, --mode', 'Which setup mode to start')
//   .action(mode => {
//     log(mode)
//     // const mode = options.setup_mode || 'normal'
//     // env = env || 'all'
//     // console.log('setup for %s env(s) with %s mode', env, mode)
//   })
// program
//   .command('exec <cmd>')
//   .alias('ex')
//   .description('execute the given remote cmd')
//   .option('-e, --exec_mode <mode>', 'Which exec mode to use')
//   .action(function(cmd, options) {
//     console.log('exec "%s" using %s mode', cmd, options.exec_mode)
//   })
//   .on('--help', function() {
//     console.log('')
//     console.log('Examples:')
//     console.log('')
//     console.log('  $ deploy exec sequential')
//     console.log('  $ deploy exec async')
//   })
// catch all for unknown commands
// program.on('command:*', function() {
//   error(
//     `Invalid command: ${program.args.join(
//       ' '
//     )}\nSee --help for a list of available commands.`
//   )
//   process.exit(1)
// })
program.parse(process.argv);
if (!process.argv.slice(2).length && meetsReactDependency) {
    program.outputHelp();
}

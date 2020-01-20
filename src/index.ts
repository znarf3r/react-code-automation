import clear from 'clear'
import commander from 'commander'
import emoji from 'node-emoji'
import * as configStack from 'config-stack'

// utils
import { error, warning, success, info } from '../utils/promt'
import { strings } from '../utils/constants'
// @ts-ignore
import { configActions } from './actions'

// configuration
const packageJson = require('../package.json')

// constants
const { log } = console

// clear to top if possible
clear()

// general info
log(emoji.emojify(strings.infoBanner))

// .yml, .yaml, .json, .json5, .hjson, toml are supported by configStack
configStack.loadFile(`${process.cwd()}/package.json`)

const dependencies = configStack.get('dependencies')
const meetsReactDependency = Object.keys(dependencies).includes('react')

// if we have no react in dependencies we bail
if (!meetsReactDependency) {
  log(emoji.emojify('This is not a react project! :disappointed:'))
  log(emoji.emojify('Please install React or run this tool on a project'))
  log(
    emoji.emojify(
      'that was created with create-react-app, more info here https://github.com/facebook/create-react-app'
    )
  )
  process.exit()
}

const program = new commander.Command(Object.keys(packageJson.bin)[0])

program
  .version(packageJson.version)
  .description(
    'A CLI to help automate repetitive boilerplate in react projects'
  )
  .option(
    '-c, --config <path>',
    'Enter the path where to read the config file',
    configActions.readConfigFromPathParam
  )
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

program.parse(process.argv)

if (!process.argv.slice(2).length && meetsReactDependency) {
  program.outputHelp()
}

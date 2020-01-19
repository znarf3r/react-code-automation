import clear from 'clear'
import program from 'commander'
import emoji from 'node-emoji'

// utils
import { error, warning, success, info } from '../utils/promt'
import { strings } from '../utils/constants'

// configuration
const packageJson = require('../package.json')
const { log } = console

// clear to top if possible
clear()
// general info
log(emoji.emojify(strings.infoBanner))

const { dependencies } = packageJson

if (Object.keys(dependencies).includes('react')) {
}
// const program = new commander.Command(packageJson.name)
program.name(packageJson.name).version(packageJson.version)
// .option('-s, --setup', 'starts the setup for your project')
// .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
// .option('-T, --no-tests', 'ignore test hook')

program
  .command('setup [mode]')
  .description('run setup for your react project')
  .option('-m, --mode', 'Which setup mode to start')
  .action(mode => {
    log(mode)
    // const mode = options.setup_mode || 'normal'
    // env = env || 'all'
    // console.log('setup for %s env(s) with %s mode', env, mode)
  })

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
program.on('command:*', function() {
  error(
    `Invalid command: ${program.args.join(
      ' '
    )}\nSee --help for a list of available commands.`
  )
  process.exit(1)
})

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

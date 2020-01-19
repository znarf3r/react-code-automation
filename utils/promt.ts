import c from 'ansi-colors'
// generals
const error = (message: string) => console.log(c.red(message))
const warning = (message: string) => console.log(c.yellow(message))
const success = (message: string) => console.log(c.green(message))
const info = (message: string) => console.log(c.cyan(message))

// const banner = (content: string) =>
//   prettier.format(content, { semi: false, parser: 'markdown' })

export { error, warning, success, info }

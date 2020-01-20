import fs from 'fs'
import shell from 'shelljs'
import Conf from 'conf'
import inquirer from 'inquirer'

import { error } from '../../utils/promt'

type ReadConfiguration = (p: string) => any

const readConfigFromPathParam: ReadConfiguration = path => {
  const { log } = console

  if (typeof path === 'undefined') {
    error(
      `no path to config file was given \n please specify a path '../path/to/config'`
    )
    process.exit(1)
  }

  if (shell.test('-f', path)) {
    // @ts-ignore
    const rawConfig = fs.readFileSync(path, 'utf8')
    const jsonConfig = JSON.parse(rawConfig)
    const {
      automation: { types: automationTypes },
    } = jsonConfig
    // console.log(automationTypes)
    // const config = {}
    // configStack.loadFile(path)
    // configStack.bindObject(config)
    // const automationConfig = configStack.getObject('automation')

    if (automationTypes && automationTypes.length > 0) {
      // @ts-ignore
      const typeChoices = Object.values(automationTypes).map(item => item.type)
      const question = {
        name: 'AUTOMATION_TYPE',
        type: 'list',
        choices: typeChoices,
      }
      // @ts-ignore
      return inquirer.prompt(question)
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
  } else {
    error(`unable to locate file at ${path}`)
    process.exit(1)
  }
}

export default {
  readConfigFromPathParam,
}

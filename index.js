#!/usr/bin/env node

const { EventEmitter } = require('events')
const path = require('path')
const chalk = require('chalk')
const Ora = require('ora')
const yargs = require('yargs')
const deploy = require('salesforce-deploy')

const argv = yargs
  .usage('Usage: $0 [options]')
  .option('hostname', {
    alias: 'h',
    describe: 'Hostname of the SFCC instance',
    demandOption: true
  })
  .option('username', {
    alias: 'u',
    describe: 'Business Manager username for instance',
    demandOption: true
  })
  .option('password', {
    alias: 'p',
    describe: 'Business Manager password for instance',
    demandOption: true
  })
  .option('cartridges', {
    alias: 'c',
    type: 'array',
    describe: 'Paths to cartridges folder to deploy',
    demandOption: true
  })
  .coerce('cartridges', args =>
    args.map(c => {
      const [source, exclude] = c.split(':')
      return { source: path.resolve(source), exclude }
    })
  )
  .option('code-version', {
    alias: 'v',
    describe: 'Name of the code version to deploy',
    demandOption: true
  })
  .option('force', {
    alias: 'f',
    describe: 'Remove code version before deploy',
    default: false
  })
  .demandCommand(0, 0)
  .help()
  .version().argv

;(async () => {
  const spinner = new Ora()
  const emitter = new EventEmitter()

  emitter.on('force', codeVersion => {
    spinner.start(
      `Removing existing code version ${chalk.bold(codeVersion)} ${chalk.gray(
        '(force)'
      )}`
    )
  })

  emitter.on('checkCodeVersion', codeVersion => {
    argv.force && spinner.succeed()
    spinner.start('Checking if the code version does not already exist')
  })

  emitter.on('mkdir', dest => {
    spinner.succeed()
    spinner.start(`Creating remote folder ${chalk.bold(dest)}`)
  })

  emitter.on('zip', () => {
    const output = argv.cartridges
      .map(c => {
        const exclude = c.exclude ? ` (${c.exclude})` : ''
        return chalk.cyan(`- ${c.source}`) + chalk.gray(exclude)
      })
      .join('\n  ')
    spinner.succeed()
    spinner.start(
      `Creating zip archive of the cartridges\n  ${chalk.cyan(output)}`
    )
  })

  emitter.on('upload', file => {
    spinner.succeed()
    spinner.start(`Uploading ${chalk.bold(file)}`)
  })

  emitter.on('unzip', file => {
    spinner.succeed()
    spinner.start(`Unzipping ${chalk.bold(file)}`)
  })

  emitter.on('rm', file => {
    spinner.succeed()
    spinner.start(`Removing ${chalk.bold(file)}`)
  })

  emitter.on('deployed', status => {
    status ? spinner.succeed() : spinner.fail()
  })

  try {
    console.log(
      `Deploying ${chalk.cyan(argv.codeVersion)} ` +
        `on ${chalk.cyan(argv.hostname)}`
    )

    const hrstart = process.hrtime()
    await deploy({ ...argv, emitter })
    const hrend = process.hrtime(hrstart)
    const executionTime = ((hrend[0] * 1e9 + hrend[1]) / 1e9).toFixed(1)

    console.log(
      `${chalk.cyan('Success!')} Deployment ready ` +
        chalk.gray('[' + executionTime + 's]')
    )

    process.exit(0)
  } catch (e) {
    spinner.fail(e.message)
    console.log(chalk.red('Deploy failed'))
    process.exit(1)
  }
})()

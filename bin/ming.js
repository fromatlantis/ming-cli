#!/usr/bin/env node
const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs')
const log = require('tracer').colorConsole()
const inquirer = require('inquirer')

program
    .version('0.1.0')
    .description('ming-cli')
program
    .command('init <project>')
    .option('-s, --scopa', 'with scopa')
    //.option('-s, --scopa [value]', 'with scopa')
    .action(async function (project, options) {
        //console.log(options.scopa);
        let libraries = ['react', 'vue', 'jquery'];
        let bundlers = ['webpack', 'parcel'];
        let questions = [{
            type: 'list',
            name: 'library',
            message: 'choose a javascript library for your app',
            choices: libraries
        }, {
            type: 'list',
            name: 'bundler',
            message: 'choose a web application bundler',
            choices: bundlers
        }];
        inquirer.prompt(questions)
            .then(answers => {
                //console.log(answers);
                let pwd = shell.pwd(), { library, bundler } = answers;
                let url = `https://github.com/fromatlantis/${library}-${bundler}.git`;
                console.log(`fetching ${url}...`)
                clone(url, pwd + `/${project}`, null, function () {
                    shell.rm('-rf', pwd + `/${project}/.git`)
                    console.log('fetching done.')
                    console.log('\x1B[32m%s\x1B[0m','Run your app with the following steps:')
                    console.info(`1. cd ${project}`)
                    console.info('2. yarn install & yarn start')
                })
            })
    })
program.parse(process.argv)
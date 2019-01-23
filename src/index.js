#! /usr/bin/env node

const fs = require('fs');
const child_process = require('child_process');
const path = require('path');
const program = require('commander');

const setting = require('./setting.json');

program
  .version('0.0.1');

program
  .command('default <ideName>')
  .description('Set default ide')
  .action(setDefaultIde);

program
  .command('config <ideName> <idePath>')
  .description('Config a new ide shortcut')
  .action(config);

program
  .command('alias <ideName> <ideAlias>')
  .description('Set alias for ide')
  .action(alias);

program
  .command('show')
  .description('Show configuration')
  .action(showConfig);

program
  .command('*')
  .action(open);

function config(ideName, idePath) {
  setting.ideMap[ideName] = { path: idePath };
  saveData();
}

function alias(ideName, ideAlias) {
  if (!setting.ideMap[ideName]) {
    console.log(`you haven't config ${ideName}`);
    return;
  }
  setting.alias[ideAlias] = ideName;
  saveData();
  console.log(`set ${ideName} alias: ${ideAlias}`);
}

function setDefaultIde(defaultIdeName) {
  if (!setting.ideMap[defaultIdeName]) {
    console.log(`you haven't config ${defaultIdeName}`);
    return;
  }
  setting.default = defaultIdeName;
  saveData();
  console.log(`set default ide: ${defaultIdeName}`);
}

function saveData() {
  const settingPath = path.resolve(__dirname, './setting.json');
  fs.writeFileSync(settingPath, JSON.stringify(setting, null, 2));
}

function open(ideName, projectPath) {
  debugger;
  let idePath;
  // use default ide
  if (typeof projectPath !== 'string') {
    projectPath = ideName;
    idePath = setting.ideMap[setting.default].path;
  } else {
    // use specific ide or alias
    const ideFullName = setting.alias[ideName] || ideName;
    if (!ideFullName) {
      console.log(`you haven't config ide or alias: ${ideName}`);
      return;
    }
    idePath = setting.ideMap[ideFullName].path
  }
  child_process.exec(`open -a ${idePath} ${projectPath}`, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr)
    }
  });
}

function showConfig() {
  console.log(JSON.stringify(setting, null, 2))
}


// TODO vscode路径名称空格转义兼容
program.parse(process.argv);

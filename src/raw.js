#! /usr/bin/env node

const fs = require('fs');
const child_process = require('child_process');
const path = require('path');
const setting = require('./setting.json');
const arg = process.argv.slice(2);

const mainCommand = arg[0];
const firstParams = arg[1];
const secondParams = arg[2];

invoke();

function invoke() {
  if (!setting.ideMap[mainCommand]) {
    const filePath = mainCommand;
    // use default ide
    open(setting.ideMap[setting.default].path, filePath);
    return;
  }
  if (mainCommand === 'config') {
    config();
    return;
  }
  if (mainCommand === 'link') {
    return;
  }
  if (mainCommand === 'alias') {
    alias();
    return;
  }
  if (mainCommand === 'default') {
    setDefaultIde();
  }
  if (setting.ideMap[mainCommand] || setting.ideMap[setting.alias[mainCommand]]) {
    // 此处调用命令行
    let ideSign = setting.ideMap[mainCommand];
    if (!ideSign) {
      ideSign = setting.ideMap[setting.alias[mainCommand]];
    }
    open(ideSign.path, firstParams);
    return;
  }
  console.log(`can not understand your command ${mainCommand}`);
}

function config() {
  if (firstParams && !secondParams) {
    if (setting.ideMap[firstParams]) {
      console.log(`config exists`);
      return;
    }

  }
}

function alias() {
  if (!setting.ideMap[firstParams]) {
    console.log(`you haven't config ${firstParams}`);
    return;
  }
  setting.alias[secondParams] = firstParams;
  saveData();
}

function setDefaultIde() {
  const defaultIde = firstParams;
  if (!setting.ideMap[defaultIde]) {
    console.log(`you haven't config ${defaultIde}`);
    return;
  }
  setting.default = defaultIde;
  saveData();
}

function open(idePath, projectPath) {
  child_process.exec(`open -a ${idePath} ${projectPath}`);
}

function saveData() {
  const settingPath = path.resolve(__dirname, './setting.json')
  fs.writeFileSync(settingPath, JSON.stringify(setting, null, 2));
}

// TODO 研究path， 研究child_process
// 研究转义

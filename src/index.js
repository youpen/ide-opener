#! /usr/bin/env node


// 描述点1 shebang
// package.json bin
// npm link的原理，与project中bin的关系
// commander 功能

const program = require('commander');

program
  .command('module')
  .alias('m')
  .description('创建新模块')
  .option('-a, --name [moduleName]', '模块名称')
  .action(option => {
    console.log(option)
  });

program.parse(process.argv);

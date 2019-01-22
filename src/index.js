// #! /usr/bin/env node
//
//
// // 描述点1 shebang
// // package.json bin
// // npm link的原理，与project中bin的关系
// // commander 功能
// // auto link自动匹配ide
// console.log(process.argv)
// const program = require('commander');
//
// program
//   .command('config')
//   // .alias('-c')
//   .description('config an application')
//   .option('-p, --path <AppPath>', 'path');
//
//   // console.log(program)
//
// program.parse(process.argv);
//
// /*
// * op link // find all ide application and auto config
// *
// * op config webstorm // config webstorm
// * op config webstorm -path [PATH]
// * // /Applications/WebStorm.app
// * // Visual\ Studio\ Code.app
// * op alias oldName newName //
// * */





var program = require('commander')
program
  .version('0.0.1')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv)
console.log('you ordered a pizza with:')
if (program.p) console.log('  - peppers')
if (program.pineapple) console.log('  - pineapple')
if (program.bbqSauce) console.log('  - bbq')
console.log('  - %s cheese', program.cheese)

const program = require('commander')
const api = require('./index')

program
  .option('-x, --xxx', 'what\'s the x',()=>{
    console.log(1);
  })
program
  .command('add')
  .description('add a task')
  .action((...args)=>{
    const words = args.slice(1).join('')
    api.add(words)
  });


program.parse(process.argv);



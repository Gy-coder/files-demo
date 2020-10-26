const db = require('./db')
var inquirer = require('inquirer');
module.exports.add = async (title) => {
//  读取之前的任务
  const list = await db.read()
//  往里面添加一个{title:string,done:boolean}
  list.push({title, done: false})
//  存储任务到文件
  await db.write(list)
}


function printTask(list) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        choices: [{name: '退出', value: '-1'}, ...list.map((item, index) => {
          return {name: `${item.done ? '[x]' : '[_]'}  ${index} - ${item.title}`, value: index}
        }), {name: '新增任务', value: '-2'}]
      },
    ])
    .then((answers) => {
      const index = parseInt(answers.index)
      if (index >= 0) {
        // printAction
        printAction(list,index)
      }else if(index === -2){
        // createTask
        createTask(list)
      }
    })
}


function printAction(list,index) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        choices: [
          {name: '退出', value: 'quit'},
          {name: '已完成', value: 'markAsDone'},
          {name: '未完成', value: 'markAsUnDone'},
          {name: '修改名称', value: 'changeName'},
          {name: '删除', value: 'remove'},
        ]
      },
    ]).then((answer) => {
    switch (answer.action) {
      case 'quit':
        break
      case 'markAsDone':
        markAsDone(list,index)
        break
      case 'markAsUnDone':
       markAsUndone(list,index)
        break
      case 'changeName':
        changeName(list,index)
        break
      case 'remove':
        remove(list,index)
        break
    }
  })
}

function markAsDone(list,index) {
  list[index].done = true
  db.write(list)
}


function markAsUndone(list,index) {
  list[index].done = false
  db.write(list)
}

function changeName(list,index) {
  inquirer.prompt({
    type: 'input',
    name: 'taskName',
    message: "请填写修改后的任务名",
  }).then((answer2) => {
    list[index].title = (answer2.taskName)
    db.write(list)
  });
}

function remove(list,index) {
  list.splice(index, 1)
  db.write(list)
}

function createTask(list){
  inquirer.prompt({
    type: 'input',
    name: 'taskName',
    message: "请填写新的任务名",
  }).then((answer) => {
    list.push({title:answer.taskName,done:false})
    db.write(list)
  });
}

module.exports.clear = async () => {
  let list = await db.read()
  if (list instanceof Array) {
    list = []
  } else {
    throw new Error('list is not array')
  }
  await db.write(list)
}

module.exports.showAll = async () => {
  const list = await db.read()
  printTask(list)
}



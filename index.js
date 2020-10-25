const db = require('./db')


module.exports.add = async (title) => {
//  读取之前的任务
  const list = await db.read()
//  往里面添加一个{title:string,done:boolean}
  list.push({title, done: false})
//  存储任务到文件
  await db.write(list)
}

module.exports.clear = async () => {
  let list = await db.read()
  if (list instanceof Array) {
    list = []
  }else {
    throw new Error('list is not array')
  }
  await db.write(list)
}

module.exports.showAll = async ()=>{
  const list = await db.read()
  list.forEach((item,index)=>{
    console.log(`${item.done ? '[X]' : '[_]'}  ${index} - ${item.title}`)
  })
}
const fs = require('fs')
const p = require('path')
const dir = process.cwd()
const dbPath = p.join(dir,'.todo')

module.exports.add = (title)=>{
//  读取之前的任务
//  往里面添加一个{title:string,done:boolean}
//  存储任务到文件
  fs.readFile(dbPath,{flags:'a+'},(error,content)=>{
    if(error) {
      console.log(error)
    }else{
      let list
      try{
        list = JSON.parse(content.toString())
      }catch (e) {
        list = []
      }
      list.push({title,done:false})
      const string = JSON.stringify(list)
      fs.writeFile(dbPath,string,(error)=>{
        if(error) console.log(error)
      })
    }
  })
}
const fs = require('fs')
const p = require('path')
const dir = process.cwd()
const dbPath = p.join(dir,'.todo')

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject)=>{
      fs.readFile(path, {flags: 'a+'}, (error, content) => {
        if (error) {
          reject()
        } else {
          let list
          try {
            list = JSON.parse(content.toString())
          } catch (e) {
            list = []
          }
          resolve(list)
        }
      })
    })
  },
  write(content,path = dbPath,) {
    const string = JSON.stringify(content)
    return new Promise((resolve, reject)=>{
      fs.writeFile(path,string,(error)=>{
        if(error) return reject()
      })
    })
  }
}


module.exports = db


/*

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
*/
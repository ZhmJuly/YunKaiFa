// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("event",event.a)
  console.log("event",event.b)
  let a = event.a;
  let b = event.b
  
  return a + b;
}
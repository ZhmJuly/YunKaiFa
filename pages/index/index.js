 //新建项目时，都是基于官方的demo开始，教程从0开始、不基于官方demo
 const DB = wx.cloud.database().collection("users");
 Page({
   data: {
     addResult: null,
     openId: ""
   },
   addData() {
    DB.add({
       data: {
         name: "海绵宝宝",
         age: 103,
         address: "海底"
       },
       success(res){
        console.log("addData",res)
       },
       fail(err){
        console.log("addData fail",err)
       }
     })
   },
   deleteData(){

   },
   qiuhe() {
     const $this = this
     wx.cloud.callFunction({
       name: 'add',
       data: {
         a: 1,
         b: 2
       },
       success(res) {
         console.log("成功", res)
         $this.setData({
           addResult: res.result
         })
       },
       fail(err) {
         console.log("失败", err)
       }

     })
   },
   //openId 唯一标识用户
   getOpenId() {
     const $this = this
     wx.cloud.callFunction({
       name: "getOpenId",
       success(res) {
         console.log("success", res.result.openid)
         $this.setData({
           openId: res.result.openid
         })
       },
       fail(err) {
         console.log("fail", res)
       }
     })
   },
   getUsers1() {
     //需要改权限，原来是仅仅管理员可读写
     wx.cloud.database().collection("users").get({
       success(res) {
         console.log("数据库api获取", res)
       },
       fail(err) {
         console.log(err)
       }
     })
   },
   getUsers2() {
     //修改权限为默认，依然可以获取成功
     //云函数可以实现推送、短信发送、邮件发送

     wx.cloud.callFunction({
       name: "getdata",
       success(res) {
         console.log("云函数获取", res)
       },
       fail(err) {
         console.log(err)
       }
     })
   }
 })
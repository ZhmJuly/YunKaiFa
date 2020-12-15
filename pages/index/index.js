 //新建项目时，都是基于官方的demo开始，教程从0开始、不基于官方demo
 //云开发 分三步讲 初始化之后
  /*  1、云数据库
  * 2、云函数
  * 3、云存储
  */
 const DB = wx.cloud.database().collection("users");
 Page({
   data: {
     addResult: null,
     openId: "",
     list: [],
     name: "",
     age: null,
     address: ""

   },
   onShow() {
     this.getUsers2();
   },
   handleName(e) {
     this.setData({
       name:e.detail.value
     })
   },
   handleAge(e) {
    this.setData({
      age:Number(e.detail.value)
    })
  },
  handleAddress(e) {
    this.setData({
      address:e.detail.value
    })
  },
   addData() {
     const $this = this
     DB.add({
       data: {
         name: this.data.name,
         age: this.data.age,
         address: this.data.address
       },
       success(res) {
         $this.getUsers2();
         $this.setData({
          name:"",
          age: null,
          address: ""
         })
         console.log("addData", res.result)
       },
       fail(err) {
         console.log("addData fail", err)
       }
     })
   },
   deleteData(e) {
     const $this = this
     const id = e.target.dataset.id;
     //doc只能查id?? 查下有没有where
     DB.doc(id).remove({
       success(res) {
         debugger
         console.log("删除成功");
         $this.getUsers2();
       },
       fail(res) {}
     })
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
     const $this = this
     wx.cloud.callFunction({
       name: "getdata",
       success(res) {
         console.log("云函数获取", res)
         $this.setData({
           list: res.result.data
         })
       },
       fail(err) {
         console.log(err)
       }
     })
   }
 })
// pages/detail/detail.js
const DB = wx.cloud.database().collection("users");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    age:null,
    address:"",
    currentData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options",options)
    this.setData({
      name:options.name,
      age:options.age,
      address:options.address,
      currentData:options
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  updateData(){
    DB.doc(this.data.currentData._id).update({
      data:{
        name:this.data.name,
        age:this.data.age,
        address:this.data.address,
      },
      success(res){
        wx.navigateTo({
          url: '/pages/index/index',
        })
      },
      fail(err){

      }
  })
  },
  handleName(e) {//输入姓名
    this.setData({
      name: e.detail.value
    })
  },
  handleAge(e) { //输入年龄
    this.setData({
      age: Number(e.detail.value)
    })
  },
  handleAddress(e) { //输入地址
    this.setData({
      address: e.detail.value
    })
  },
})
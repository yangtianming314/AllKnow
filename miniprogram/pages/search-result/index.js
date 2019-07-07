// pages/search-result/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "search_word": "",
    "course": [{
      "img": "/images/avatar.png",
      "title": "课程1",
      "teacher": "杨天明",
      "teacher_desc": "hahaha",
      "watch": 2345,
      "tag": [{
        "name": "第一性原理",
        "score": 0.823,
      }, {
        "name": "第二曲线",
        "score": 0.823,
      }, {
        "name": "分形创新",
        "score": 0.823,
      }, ]
    }, {
      "img": "/images/avatar.png",
      "title": "课程1",
      "teacher": "杨天明",
      "teacher_desc": "hahaha",
      "watch": 2345,
      "tag": [{
        "name": "第一性原理",
        "score": 0.823,
      }, {
        "name": "第二曲线",
        "score": 0.823,
      }, {
        "name": "分形创新",
        "score": 0.823,
      }, ]
    }, {
      "img": "/images/avatar.png",
      "title": "课程1",
      "teacher": "杨天明",
      "teacher_desc": "hahaha",
      "watch": 2345,
      "tag": [{
        "name": "第一性原理",
        "score": 0.823,
      }, {
        "name": "第二曲线",
        "score": 0.823,
      }, {
        "name": "分形创新",
        "score": 0.823,
      }, ]
    }],
  },

  /**
   * 搜索
   */
  onSearch: function(e) {
    var that = this;
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this;
    console.log("搜索的内容：" + e.search_word);
    that.setData({
      search_word: e.search_word
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
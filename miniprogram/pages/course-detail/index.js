// miniprogram/pages/course-detail/index.js

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:'',
    source:''
  },

  /**
   * 根据传递来的 _id 获取课程数据
   */
  onGetCourseInfo: function(e) {
    var that = this
    //console.log(e)
    db.collection('course_info').doc(e).get({
      success: function (res) {
        console.log(res.data.tags)
        that.setData({
          course: res.data
        })
        //得到来源后，查询来源详情信息
        db.collection('source_info').where({
          source_name: res.data.source_name
        })
        .get({
          success: function(res) {
            //console.log(res.data[0])
            that.setData({
              source: res.data[0]
            })
            wx.hideLoading()
          }
        })
      }
    })
  },

  /**
   * 点击一键复制课程链接
   */
  onCopyLinkButtonTap: function(e) {
    var that = this
    //将课程链接复制到剪切板
    wx.setClipboardData({
      data: that.data.course.course_url,
    })
  },

  /**
   * 点击课程标签
   */
  onTagTap: function(e){
    //重新查询课程标签
    wx.redirectTo({
      url: '/pages/search-result/index?search_word=' + e.currentTarget.dataset.search_word,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this
    //console.log(e._id)
    wx.showLoading({
      title: '加载中',
    })

    //调用云函数实现观看次数增加
    wx.cloud.callFunction({
      name: 'increase-watch',
      data: {
        _id: e._id
      },
      success: res => {
        console.log("云函数调用成功！", res)
      },
      fail: console.error
    })
    that.onGetCourseInfo(e._id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
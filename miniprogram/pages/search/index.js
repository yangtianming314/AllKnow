// pages/search/index.js

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "search_word": '',
    "recommend_search": '',
    "hot_search": '',
    "history": []
  },

  /**
   * 获取搜索输入
   */
  onSearchInput: function(e) {
    var that = this
    that.setData({
      search_word: e.detail.value
    })
  },

  /**
   * 点击热门搜索词
   */
  onHotSearchTap: function(e) {
    var that = this
    that.onSaveHistory(e.currentTarget.dataset.search_word)
    wx.navigateTo({
      url: '/pages/search-result/index?search_word=' + e.currentTarget.dataset.search_word,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this;
    that.setData({
      recommend_search: e.recommend_search
    })

    db.collection('hot_search').where({
        'is_show': true
      })
      .get({
        success: function(res) {
          //console.log(res.data)
          that.setData({
            hot_search: res.data
          })
        }
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
    var that = this
    //console.log("测试点")
    wx.getStorage({
      key: 'history',
      success: function(res) {
        //console.log(res.data)
        that.setData({
          history: JSON.parse(res.data)
        })
      }
    })
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

  },

  /**
   * 点击搜索
   */
  onSearch: function(e) {
    var that = this;
    var search_word;
    if (that.data.search_word == "") {
      search_word = that.data.recommend_search;
    } else {
      search_word = that.data.search_word;
    }
    that.onSaveHistory(search_word)
    
    wx.navigateTo({
      url: '/pages/search-result/index?search_word=' + search_word,
    })
  },

  /**
   * 保存搜索历史
   */
  onSaveHistory: function(e) {
    var that = this
    var history = that.data.history
    history.unshift(e)
    if (history.length > 3) {
      history.pop()
    }
    //console.log(history)
    var storage_data = JSON.stringify(history)
    console.log(storage_data)

    wx.setStorageSync('history', storage_data)
  }
})
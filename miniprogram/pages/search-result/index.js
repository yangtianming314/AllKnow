// pages/search-result/index.js

const app = getApp()
const db = wx.cloud.database()
const MAX_LIMIT = 20

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_word: '',
    course: '',
    recommend_search: '',
    offset: 0
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
   * 点击搜索按钮
   */
  onSearchTap: function(e) {
    var that = this;
    that.setData({
      course: []
    })
    that.onSearch()
  },

  /**
   * 搜索
   */
  onSearch: function(e) {
    var that = this;

    if (that.data.search_word == '') {
      that.setData({
        search_word: that.data.recommend_search
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    
    //console.log(app.globalData.access_token)
    wx.request({
      url: 'https://aip.baidubce.com/rpc/2.0/nlp/v1/lexer?charset=UTF-8&access_token=' + app.globalData.access_token,
      data: {
        text: that.data.search_word
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        //console.log(res.data)
        var query = []
        for (var i = 0, len = res.data.items.length; i < len; i++) {
          query.push(res.data.items[i].item)
        }
        //console.log(query)
        db.collection('course_info').orderBy('tags.score', 'desc').skip(that.data.offset * MAX_LIMIT).limit(MAX_LIMIT).where(db.command.or([{
            'tags.tag': db.command.in(query)
          }, {
            'title': db.RegExp({
              regexp: that.data.search_word,
              options: 'i'
            })
          }, {
            'teacher': db.RegExp({
              regexp: that.data.search_word,
              options: 'i'
            })
          }, {
            'desc': db.RegExp({
              regexp: that.data.search_word,
              options: 'i'
            })
          },{
            'source_name': db.RegExp({
              regexp: that.data.search_word,
              options: 'i'
            })
          }]))
          .get({
            success: function(res) {
              //console.log(res.data)
              var course = that.data.course
              course = course.concat(res.data)

              that.setData({
                course: course
              })
            }
          })
        wx.hideLoading()
      }
    })
  },

  /**
   * 点击标签
   */
  onTagTap: function(e) {
    var that = this
    wx.redirectTo({
      url: '/pages/search-result/index?search_word=' + e.currentTarget.dataset.search_word,
    })
  },

  /**
   * 点击课程
   */
  onCourseTap: function(e) {
    var that = this
    //console.log(e.currentTarget.dataset._id)
    wx.navigateTo({
      url: '/pages/course-detail/index?_id=' + e.currentTarget.dataset._id,
    })
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
    db.collection('recommend_search').limit(1).get({
      success: function(res) {
        //console.log("推荐搜索词：" + res.data[0].search_word)
        that.setData({
          recommend_search: res.data[0].search_word
        })
      }
    })
    that.setData({
      course: []
    })
    that.onSearch()
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
    that.setData({
      offset: 0
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
    var that = this
    var offset = that.data.offset + 1
    that.setData({
      offset: offset
    })
    console.log(that.data.offset)
    that.onSearch()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
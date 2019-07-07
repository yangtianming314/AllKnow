//index.js
const app = getApp()

Page({
  data: {
    //测试数据
    "recommend_search": "第一性原理",
    "banner": [{
      "url": "/images/code-db-inc-dec.png",
      "_id": ""
    }, {
      "url": "/images/code-db-inc-dec.png",
      "_id": ""
    }, {
      "url": "/images/code-db-inc-dec.png",
      "_id": ""
    }, {
      "url": "/images/code-db-inc-dec.png",
      "_id": ""
    }],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    "tag": [{
      "name": "标签1",
      "score": "0.812"
    }, {
      "name": "标签2",
      "score": "0.812"
    }, {
      "name": "标签3",
      "score": "0.812"
    }, {
      "name": "标签3",
      "score": "0.812"
    }, {
      "name": "标签3",
      "score": "0.812"
    }, {
      "name": "标签3",
      "score": "0.812"
    }, {
      "name": "标签4",
      "score": "0.812"
    }],

    "one_course_everyday": {
      "img": "/images/avatar.png",
      "title": "认知升级之第一性原理认知升级之第一性原理认知升级之第一性原理",
      "teacher": "李善友",
      "teacher_desc": "混沌大学创办人",
      "watch": 234,
    },

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
    }, ],
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  /**
   * 点击搜索框
   */
  onSearchTap: function(e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/search/index?recommend_search=' + that.data.recommend_search,
    })
  },

  /**
   * 点击轮播图 
   */
  onBannerTap: function(e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/course-detail/index?_id=' + e.currentTarget.dataset._id,
    })
  },

  /**
   * 点击标签
   */
  onTagTap: function(e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/search-result/index?search_word=' + e.currentTarget.dataset.search_word,
    })
  },

  /**
   * 点击课程
   */
  onCourseTap: function(e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/course-detail/index?_id=' + e.currentTarget.dataset._id,
    })
  },
})
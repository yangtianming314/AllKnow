//index.js
const app = getApp()
const db = wx.cloud.database()
const MAX_LIMIT = 1

Page({
  data: {
    //测试数据
    recommend_search: '',
    banner: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,

    recommend_tags: [{
      "tag": "网络异常",
    }],

    one_course_everyday: {

    },

    course: [{
      "img": "/images/avatar.png",
      "title": "课程1",
      "teacher": "杨天明",
      "teacher_desc": "hahaha",
      "watch": 2345,
      "tags": [{
        "tag": "暂无",
        "score": 0,
      }]
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
    var that = this
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    that.getRecommendSearch()
    that.getBanner()
    that.getRecommendTag()
    
  },

  onShow: function(e) {
    var that = this
    that.getOneCourseEveryDay()
    that.getCourseFlow()
  },

  /**
   * 获取搜索推荐词
   * 说明：获取首个推荐词
   */
  getRecommendSearch: function(e) {
    var that = this
    db.collection('recommend_search').limit(1).get({
      success: function(res) {
        //console.log("推荐搜索词：" + res.data[0].search_word)
        that.setData({
          recommend_search: res.data[0].search_word
        })
      }
    })
  },

  /**
   * 获取轮播图
   */
  getBanner: function(e) {
    var that = this
    db.collection('banner').where({
        is_show: true
      })
      .get({
        success: function(res) {
          //console.log(res.data)
          that.setData({
            banner: res.data
          })
        }
      })
  },

  /**
   * 获取推荐标签
   */
  getRecommendTag: function(e) {
    var that = this
    db.collection('recommend_tag').where({
        is_show: true
      })
      .get({
        success: function(res) {
          //console.log(res.data)
          that.setData({
            recommend_tags: res.data
          })
        }
      })
  },

  /**
   * 获取每日一课
   */
  getOneCourseEveryDay: function(e) {
    var that = this
    db.collection('course_info').limit(1).where({
        is_one_course_everyday: true
      })
      .get({
        success: function(res) {
          that.setData({
            one_course_everyday: res.data[0]
          })
        }
      })
  },

  /**
   * 获取课程推荐信息流
   */
  getCourseFlow: function(e) {
    var that = this
    db.collection('course_info').where({
        is_course_flow: true
      })
      .get({
        success: function(res) {
          //console.log(res.data)
          that.setData({
            course: res.data
          })
        }
      })
  },

  /**
   * 点击搜索框
   */
  onSearchTap: function(e) {
    var that = this
    wx.navigateTo({
      url: '/pages/search/index?recommend_search=' + that.data.recommend_search,
    })
  },

  /**
   * 点击轮播图 
   */
  onBannerTap: function(e) {
    var that = this
    wx.navigateTo({
      url: '/pages/course-detail/index?_id=' + e.currentTarget.dataset._id,
    })
  },

  /**
   * 点击标签
   */
  onTagTap: function(e) {
    var that = this
    wx.navigateTo({
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
})
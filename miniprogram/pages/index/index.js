//index.js
const app = getApp()
const db = wx.cloud.database()
const MAX_LIMIT = 1

Page({
  data: {
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

    course: [],
    history: [],
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

    // that.data.setInter = setInterval(function(){
    //   that.updateTag()
    // }, 500)

  },

  onShow: function(e) {
    var that = this
    wx.getStorage({
      key: 'history',
      success: function(res) {
        //console.log(res.data)
        that.setData({
          history: JSON.parse(res.data)
        })
        that.getCourseFlow()
      }
    })
    that.getOneCourseEveryDay()
    that.updateTag()
  },

  /**
   * 更新标签
   */
  updateTag: function(e) {
    db.collection('course_info').where({
        has_tag: false //查询条件：若改课程没有标签
      })
      .get({
        success: function(res) {
          //console.log(res.data)
          var result = res.data[0] //由于百度 api 有 5 QPS/s 的限制，每次只取 1 个符合条件的查询结果
          //console.log(result._id)
          //调用文章标签提取 api
          wx.request({
            url: 'https://aip.baidubce.com/rpc/2.0/nlp/v1/keyword?charset=UTF-8&access_token=' + app.globalData.access_token,
            data: {
              title: result.title,
              content: result.desc
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              //console.log(res)
              //调用云函数更新课程信息
              wx.cloud.callFunction({
                name: 'extraction-tag',
                data: {
                  _id: result._id,
                  tags: res.data.items
                },
                success: res => {
                  //console.log('云函数调用成功', res)
                },
                fail: console.error
              })
            }
          })
        }
      })
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

    //console.log(that.data.history)
    if (that.data.history.length != 0) {
      var query = that.data.history //按搜索历史的关键词得到课程推荐信息流

      //查询匹配条件命中标签、标题、老师、简介、来源
      db.collection('course_info').orderBy('watch', 'desc').where(db.command.or([{
          'tags.tag': db.command.in(query)
        }, {
          'title': db.RegExp({
            regexp: query[0],
            options: 'i'
          })
        }, {
          'teacher': db.RegExp({
            regexp: query[0],
            options: 'i'
          })
        }, {
          'desc': db.RegExp({
            regexp: query[0],
            options: 'i'
          })
        }, {
          'source_name': db.RegExp({
            regexp: query[0],
            options: 'i'
          })
        }]))
        .get({
          success: function(res) {
            //console.log(res.data)
            that.setData({
              course: res.data
            })
          }
        })
    } else {
      //如果没有搜索历史，提供一个初始的课程推荐信息流
      db.collection('course_info').orderBy('watch', 'desc').where({
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
    }

  },

  /**
   * 点击搜索框：跳转搜索页面
   */
  onSearchTap: function(e) {
    var that = this
    wx.navigateTo({
      url: '/pages/search/index?recommend_search=' + that.data.recommend_search,
    })
  },

  /**
   * 点击轮播图 ：跳转课程详情页
   */
  onBannerTap: function(e) {
    var that = this
    wx.navigateTo({
      url: '/pages/course-detail/index?_id=' + e.currentTarget.dataset._id,
    })
  },

  /**
   * 点击标签：跳转搜索结果页
   */
  onTagTap: function(e) {
    var that = this
    wx.navigateTo({
      url: '/pages/search-result/index?search_word=' + e.currentTarget.dataset.search_word,
    })
  },

  /**
   * 点击课程：跳转课程详情页
   */
  onCourseTap: function(e) {
    var that = this
    //console.log(e.currentTarget.dataset._id)
    wx.navigateTo({
      url: '/pages/course-detail/index?_id=' + e.currentTarget.dataset._id,
    })
  },
})
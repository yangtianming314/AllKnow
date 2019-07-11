//app.js
App({
  onLaunch: function() {
    var that = this

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    that.baidu_api()
  },
  baidu_api: function() {
    var that = this

    var grant_type = 'client_credentials'
    var api_key = 'ksUzpbGyxStzKPVCgPnVKaet'
    var secret_key = 'hVVG56066PP9hiaVqfksRqwpKRdGBdId'
    var url = 'https://aip.baidubce.com/oauth/2.0/token'
    var token

    wx.request({
      url: url,
      data: {
        grant_type: grant_type,
        client_id: api_key,
        client_secret: secret_key
      },
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        //console.log(res.data)
        that.globalData.access_token = res.data.access_token
        token = res.data.access_token
        const db = wx.cloud.database()

        db.collection('course_info').where({
            has_tag: false
          })
          .get({
            success: function(res) {
              //console.log(res.data)
              var result = res.data[0]
                //console.log(result._id)
                //文章标签提取
                wx.request({
                  url: 'https://aip.baidubce.com/rpc/2.0/nlp/v1/keyword?charset=UTF-8&access_token=' + token,
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
                    console.log(result)
                    wx.cloud.callFunction({
                      name: 'extraction-tag',
                      data: {
                        _id: result._id,
                        tags: res.data.items
                      },
                      success: res => {
                        console.log('云函数调用成功', res)
                      },
                      fail: console.error
                    })
                  }

                })
            }
          })
      }
    })
  },

  globalData: {
    access_token: '',
  }
})
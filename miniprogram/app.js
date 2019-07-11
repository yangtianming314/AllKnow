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
      }
    })
  },

  globalData: {
    access_token: '',
  }
})
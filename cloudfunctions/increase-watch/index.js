// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  return await db.collection('course_info').doc(event._id).update({
    data: {
      watch: db.command.inc(1)
    },
    success: function(res) {

    }
  })
}
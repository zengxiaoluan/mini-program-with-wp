//index.js
var WxParse = require('../../wxParse/wxParse.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    posts: [],
    userInfo: {},
    pageIndex: 1,
    wpApiSettings : {
      url:'https://welinkcredit.com',
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
    var that = this;
    wx.request( {
      url: that.data.wpApiSettings.url + '/wp-json/wp/v2/posts',
      method: 'GET',
      dataType: 'json',
      complete: function( data ){
        // console.log( data )
      },
      success: function( data ){
        if( data.statusCode != 200 ){
           wx.showModal({
            title: '提示',
            content: '数据请求失败！',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }
              }
            })
            return;
        }
        that.setData({
          posts: data.data
        })
        // WxParse.wxParse('article', 'html', data.data.content.rendered, that, 5);   
      },
    });
  },
  bindscrolltolower: function( e ){
    console.log(e)
  },
  loadmore: function(){
    // console.log('eee')
    var that = this;
    wx.request({
      url: that.data.wpApiSettings.url + '/wp-json/wp/v2/posts?page=' + parseInt( that.data.pageIndex+1 ),
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        if( res.data.length == 0 ){
          wx.showModal({
            title: '提示',
            content: '已经没有更多内容了。',
            showCancel: false
          });
          return;
        }
        that.setData({
          posts:  that.data.posts.concat( res.data ),
          pageIndex: that.data.pageIndex+1
        });
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }
});

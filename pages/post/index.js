var app = getApp()
Page({
    data:{
        post: {}
    },
    onLoad: function ( options ) {
        var wpApiSettings = {
            url:'https://zengxiaoluan.com',
        }
        var that = this;
        wx.request( {
            url: wpApiSettings.url + '/wp-json/wp/v2/posts/' + options.id,
            method: 'GET',
            dataType: 'json',
            complete: function( data ){
                console.log( data )
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
                        post: data.data
                    })
            },
        });
    }
})
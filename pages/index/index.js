//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    titles: ["绘制贝塞尔曲线", "自定义动画路径", "自定义动画速度曲线"]
  },
  onLoad: function () {
    
  },

  tapTitleAction(e) {
    switch (e.currentTarget.dataset.index) {
      case 0:
        wx.navigateTo({
          url: '/pages/bezier-curve/bezier-curve'
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/path-animation/path-animation'
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/timing-function-example/timing-function-example'
        })
        break;
    
      default:
        break;
    }
  }
})

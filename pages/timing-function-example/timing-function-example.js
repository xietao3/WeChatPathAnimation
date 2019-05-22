// pages/timing-function-example/timing-function-example.js

import { requestAnimationFrame, cancelAnimationFrame } from "../../XTPathAnimation/animation-frame.js"

let pApp = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.baseX = 50;
    this.baseY = 100;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    setTimeout(()=>{
      if (pApp.globalData.progressPoints.length > 0) {
        that.progressPoints = pApp.globalData.progressPoints
        that.startAnimation(that.progressPoints)
      } else {
        that.progressPoints = []
        var i = 0
        while (i <= 1) {
          that.progressPoints.push(i)
          i += 0.01
        }
        that.startAnimation(that.progressPoints)
      }
    }, 1000)
  },
  tapChooseAction() {
    wx.navigateTo({
      url: '/pages/timing-function/timing-function'
    })
  },

  startAnimation() {
    var progress = 0
    requestAnimationFrame(() => {
      if (progress >= this.progressPoints.length - 1) cancelAnimationFrame()
      this.drawMovingRect(this.progressPoints[progress])
      progress += 1
    })
  },

  drawMovingRect(progress) {
    const ctx = wx.createCanvasContext('moving-rect')
    ctx.rect(this.baseX + 250 * progress, this.baseY, 50, 50)
    ctx.setFillStyle('red')
    ctx.fill()
    ctx.draw()
  }
})
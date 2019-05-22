// pages/PathAnimation/path-animation.js
import calcBezierCurvePoint from "../../XTPathAnimation/bezier-generator"
import CanvasHelper from "../../XTPathAnimation/canvas-helper.js"
import { requestAnimationFrame, cancelAnimationFrame } from "../../XTPathAnimation/animation-frame.js"

import { getAngleFromPoints } from "../../XTPathAnimation/utility"

let pApp = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    if (pApp.globalData.bezierPoints.length > 0) {
      this.pathPoints = pApp.globalData.bezierPoints
      this.drawHeartPath(this.pathPoints)
    }
    this.drawHeartShape()
  },
  tapChooseAction() {
    wx.navigateTo({
      url: '/pages/bezier-curve/bezier-curve?type=getPath'
    })
  },
  drawHeartShape() {
    let controlPoints1 = [{ x: 50, y: 30 }, { x: 80, y: 0 }, { x: 100, y: 65 }, {x:60, y: 65}, { x: 50, y: 80 }]
    let controlPoints2 = [{ x: 50, y: 80 }, { x: 40, y: 65 }, { x: 0, y: 65 }, { x: 20, y: 0 }, { x: 50, y: 30 }]
    var bezierPoints =  calcBezierCurvePoint(controlPoints1, 1)
    bezierPoints = bezierPoints.concat(calcBezierCurvePoint(controlPoints2, 1))
    const ctx = wx.createCanvasContext('heart-shape')
    CanvasHelper.drawLine(ctx, bezierPoints, '#f00')
    ctx.setFillStyle('#f00')
    ctx.setShadow(0, 0, 10, '#333')
    ctx.fill()
    ctx.draw()

    setTimeout(this.saveCanvasToTempFilePath, 1000)
  },

  saveCanvasToTempFilePath() {
    let that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 100,
      height: 80,
      destWidth: 100,
      destHeight: 80,
      canvasId: 'heart-shape',
      success: function (res) {
        that.drawMovingImage(res.tempFilePath)
      },
      fail: function (error) {
        console.log(error)
      }
    })

  },
  drawMovingImage(filePath) {
    if (this.pathPoints) {
      let duration = this.pathPoints.length
      var progress = 0
      var angle = 0;

      requestAnimationFrame(() => {
        if (!this.pathPoints[progress] || !this.pathPoints[progress + 1] || progress >= duration-2) {
          cancelAnimationFrame();
          return;
        } else {
          angle = getAngleFromPoints(this.pathPoints[progress], this.pathPoints[progress + 1])
          progress += 1

        }
        let currentPoint = this.pathPoints[progress]
        const ctx = wx.createCanvasContext('heart-shape')
        ctx.translate(currentPoint.x, currentPoint.y)
        ctx.rotate(angle + Math.PI/2)
        ctx.drawImage(filePath, 0, 0, 100, 80, -25,  -20, 50, 40)
        ctx.draw()  
      })

    }
  },

  drawHeartPath(pathPoints) {
    const ctx = wx.createCanvasContext('heart-path')
    // ctx.rotate(20 * Math.PI / 180)
    CanvasHelper.drawLine(ctx, pathPoints, 'gray')
    ctx.draw()
  }
})
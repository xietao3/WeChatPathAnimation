// pages/timing-function/timing-function.js
import calcBezierCurvePoint from "../../XTPathAnimation/bezier-generator"
import CanvasHelper from "../../XTPathAnimation/canvas-helper.js"
import { requestAnimationFrame, cancelAnimationFrame } from "../../XTPathAnimation/animation-frame.js"
import { getMinDistancePoint } from "../../XTPathAnimation/utility"

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
    this.baseX = 50
    this.baseY = 200

    this.oringinPoints = [{
      x: this.baseX+150,
      y: this.baseY+200
    }, {
        x: this.baseX + 150,
        y: this.baseY
      // }, {
      //   x: this.baseX + 150,
      //   y: this.baseY+50
      // }, {
      //   x: this.baseX + 150,
      //   y: this.baseY+100
      }]

    this.oringinPointColor = 'green'
    this.oringinPointRadius = 4
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
    this.drawChart()
    this.drawOringinPoints()
    this.drawBezierPoints()

  },

  tapChooseAction() {
    var tempProgressPoints = []
    for (let i = 0; i < this.bezierPoints.length; i++) {
      let point = this.bezierPoints[i]
      tempProgressPoints.push(1 - (point.y - 200) / 200)
    }
    pApp.globalData.progressPoints = tempProgressPoints
    wx.navigateBack({ delta: 1 })

  },

  drawChart() {
    let chartSidePoint = [{ x: this.baseX, y: this.baseY }, { x: this.baseX + 300, y: this.baseY }, { x: this.baseX + 300, y: this.baseY + 200 }, { x: this.baseX, y: this.baseY + 200 }, { x: this.baseX, y: this.baseY }]
    const ctx = wx.createCanvasContext('chart')
    CanvasHelper.drawLine(ctx, chartSidePoint, 'gray')
    ctx.draw()
  },

  touchStartEvent(e) {
    let touchPoint = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY }
    this.currentMovingPointIndex = getMinDistancePoint(this.oringinPoints, touchPoint)
    this.startListenMovingPoints()
  },
  touchMoveEvent(e) {
    this.oringinPoints[this.currentMovingPointIndex] = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY }
  },
  touchCancelEvent(e) {
    cancelAnimationFrame()
  },
  touchEndEvent(e) {
    cancelAnimationFrame()
  },
  startListenMovingPoints() {
    requestAnimationFrame(() => {
      this.drawOringinPoints()
      this.drawBezierPoints()
    })
  },

  drawOringinPoints() {
    const ctx = wx.createCanvasContext('oringin-points')
    let allPoints = this.getAllPoints()
    for (let index = 0; index < allPoints.length; index++) {
      CanvasHelper.drawPoint(ctx, allPoints[index], this.oringinPointColor, this.oringinPointRadius)
    }
    CanvasHelper.drawLine(ctx, allPoints, this.oringinPointColor)
    ctx.draw()
  },

  drawBezierPoints() {
    this.bezierPoints = calcBezierCurvePoint(this.getAllPoints(), 1)
    const ctx = wx.createCanvasContext('chart-curve')
    CanvasHelper.drawLine(ctx, this.bezierPoints, 'red')
    ctx.draw()
  },

  getAllPoints() {
    return [{ x: this.baseX, y: this.baseY + 200 }, ...this.oringinPoints, { x: this.baseX + 300, y: this.baseY }]
  }
})
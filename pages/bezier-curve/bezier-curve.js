// pages/bezier-curve/bezier-curve.js
import CanvasHelper from "../../XTPathAnimation/canvas-helper.js"
import {requestAnimationFrame, cancelAnimationFrame} from "../../XTPathAnimation/animation-frame.js"
import {getMinDistancePoint} from "../../XTPathAnimation/utility"
import calcBezierCurvePoint from "../../XTPathAnimation/bezier-generator"

let pApp = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showChooseButton:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type == 'getPath') {
      this.setData({showChooseButton: true})
      this.oringinPoints = [{
          x: 200,
          y: 500
        }, {
          x: 100,
          y: 400
        }, {
          x: 300,
          y: 200
        }, {
          x: 200,
          y: 100
        }]
    }else{
      this.oringinPoints = [{
        x: 100,
        y: 100
      }, {
        x: 200,
        y: 100
      }, {
        x: 200,
        y: 200
      }, {
        x: 100,
        y: 200
      }, {
        x: 300,
        y: 300
      }]
    }

    this.oringinPointColor = 'gray'
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
    if (this.oringinPoints) {
      this.drawOringinPoints()
      this.drawBezierPoints()
    }
  },

  tapChooseAction() {
    pApp.globalData.bezierPoints = this.bezierPoints
    wx.navigateBack({ delta: 1})
  },

  touchStartEvent(e) {
    let touchPoint = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY}
    this.currentMovingPointIndex = getMinDistancePoint(this.oringinPoints, touchPoint)    
    this.startListenMovingPoints()
  },
  touchMoveEvent(e) { 
    this.oringinPoints[this.currentMovingPointIndex] = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY}
  },
  touchCancelEvent(e) {
    cancelAnimationFrame()
  },
  touchEndEvent(e) {
    cancelAnimationFrame()
  },

  startListenMovingPoints() {
    requestAnimationFrame(()=> {
      this.drawOringinPoints()
      this.drawBezierPoints()
    })
  },
  drawOringinPoints() {
    const ctx = wx.createCanvasContext('oringin-points')   
    for (let index = 0; index < this.oringinPoints.length; index++) {
      CanvasHelper.drawPoint(ctx, this.oringinPoints[index], this.oringinPointColor, this.oringinPointRadius) 
    }    
    CanvasHelper.drawLine(ctx, this.oringinPoints, this.oringinPointColor)
    ctx.draw()
  },

  drawBezierPoints() {    
    this.bezierPoints =  calcBezierCurvePoint(this.oringinPoints, 1)
    const ctx = wx.createCanvasContext('bezier-points')
    CanvasHelper.drawLine(ctx, this.bezierPoints, 'red') 
    ctx.draw()
  }
})
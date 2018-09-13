export default class CanvasHelper extends Object {
  constructor(context) {
    super()
    this.context = context
  }

  static drawPoint(context, point, color, r) {
    if (!point) return
    let ctx = context
    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.arc(point.x, point.y, r || 10, 0, 2 * Math.PI)
    ctx.setFillStyle(color || 'red')
    ctx.fill()
    ctx.closePath()
  }

  static drawLine(context, points, color) {
    let ctx = context
    ctx.beginPath()

    for (let key in points) {
      let point = points[key]
      ctx.lineTo(point.x, point.y)
    }
    ctx.setStrokeStyle(color || 'red')
    ctx.stroke()
    ctx.closePath()
  }

}

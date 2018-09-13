var calcBezierCurvePoint = function(points, durationSecond) {
    let duration = 60.0 * durationSecond // 60 fps
    var progress = 0
    var bezierPoints = [points[0]]

    while (progress < duration) {
        progress += 1
        let bezierPoint = calcMovingPoints(points, progress, duration)
        bezierPoints.push(bezierPoint)
    }
    bezierPoints.push(bezierPoints[bezierPoints.length-1])

    return bezierPoints
}

  var calcMovingPoints = function(points, progress, duration) {
    var nextLevelPoints = []
    for (let i = 0; i < points.length - 1; i++) {
      let movingPoint = calcMovingPoint(points[i], points[i + 1], progress, duration)
      nextLevelPoints.push(movingPoint)
    }
    if (nextLevelPoints.length >= 2) {
      return calcMovingPoints(nextLevelPoints, progress, duration)
    }else{
      return nextLevelPoints[0]
    }    
  }

  var calcMovingPoint = function(currentPoint, nextPoint, progress, duration) {
    let deltaX = (nextPoint.x - currentPoint.x) / duration
    let deltaY = (nextPoint.y - currentPoint.y) / duration
    let movingX = currentPoint.x + deltaX * progress
    let movingY = currentPoint.y + deltaY * progress
    return {x: movingX, y: movingY }
  }

  export default calcBezierCurvePoint
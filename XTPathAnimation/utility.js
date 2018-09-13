var getMinDistancePoint = function(points, targetPoint) {
    var distanceList = []
    // 算出每个点离目标点的距离
    for (let index = 0; index < points.length; index++) {
        const point = points[index];
        // 这里开根号或者不开都无所谓 不影响结果
        // let distance = Math.sqrt(Math.pow(targetPoint.x - point.x, 2) * Math.pow(targetPoint.y - point.y, 2))
        let distance = Math.pow(targetPoint.x - point.x, 2) * Math.pow(targetPoint.y - point.y, 2)
        distanceList.push(distance)
    }

    // 利用数学函数求出最小距离
    let minDistance = Math.min(...distanceList)
    
    // 找出等于最小距离的那个值并返回
    for (let index = 0; index < distanceList.length; index++) {
        const distance = distanceList[index];
        if (distance == minDistance) return index
    }
  }


var getAngleFromPoints = function(startPoint, endPoint) {
  if (!startPoint || !endPoint) return

  let tempPoint = {x: startPoint.x + 100, y: startPoint.y}
  let a = endPoint.x - startPoint.x
  let b = endPoint.y - startPoint.y;
  let c = tempPoint.x - startPoint.x;
  let d = tempPoint.y - startPoint.y;

  var rads = Math.acos(((a * c) + (b * d)) / ((Math.sqrt(a * a + b * b)) * (Math.sqrt(c * c + d * d))));
  if (startPoint.y > endPoint.y) {
    rads = -rads;
  }
  return rads
}

export { getMinDistancePoint, getAngleFromPoints}
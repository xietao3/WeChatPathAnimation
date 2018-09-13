var timer = undefined

function requestAnimationFrame(callback) {
  var start;
  timer = setTimeout(function () {
    start = +new Date();
    requestAnimationFrame(callback)
    callback(start);
  }, 16);
}

function cancelAnimationFrame() {
  clearTimeout(timer)
}

export {requestAnimationFrame, cancelAnimationFrame}

const getCurrentTime = function () {
  return new Date().toLocaleString()
}

const repeatLoadTime = function() {
  setTimeout(_ => {
    const time = getCurrentTime()
    repeatLoadTime()
    postMessage(time)
  })
}

repeatLoadTime()

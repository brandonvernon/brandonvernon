window.addEventListener('load', windowLoad, false)

// Apply Correct Styles on Window Load
var ua = window.navigator.userAgent
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
var webkit = !!ua.match(/WebKit/i)
var iOSSafari = iOS && webkit && !ua.match(/CriOS/i)

const header = document.getElementById('header'),
  headerLoadBG = document.getElementById('headerLoadBG'),
  headerLoadBGName = document.getElementById('headerLoadBGName'),
  firstHeadline = document.getElementsByTagName('h1')[0]

function windowLoad() {
  if (!iOSSafari) {
    if (window.location.href == 'https://www.brandonvernon.com/') {
      headerLoadBGName.style.opacity = '1'
    } else {
      headerLoadBGName.style.opacity = '1' // Remove for Prod
      firstHeadline.style.opacity = '1'
    }
    setTimeout(function () {
      headerLoadBG.style.height = '0px'
      headerLoadBGName.style.opacity = '0'
    }, 1000)
    setTimeout(function () {
      headerLoadBGName.style.display = 'none'
      firstHeadline.style.opacity = '1'
    }, 1500)
  } else if (iOSSafari) {
    headerLoadBG.style.height = '0px'
    headerLoadBGName.style.display = 'none'
    firstHeadline.style.opacity = '1'
  }
}

// Footer: Get current year
const year = document.querySelector('.year')

year.innerHTML = new Date().getFullYear()

// Disable Scroll
function disableScroll() {
  // Get the current page scroll position
  scrollTop = window.pageYOffset || document.documentElement.scrollTop
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  // if any scroll is attempted, set this to the previous value
  window.onscroll = function() {
    window.scrollTo(scrollLeft, scrollTop)
  }
}

// Enable Scroll
function enableScroll() {
  window.onscroll = function() {}
}

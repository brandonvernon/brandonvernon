/*** Variables ***/

// Tabindex Variables
//const zero = document.getElementsByClassName('zero');

// Variables: Nav
const checkbox = document.getElementById('checkbox'),
  navMobile = document.getElementById('navMobile')

// Variables: Header
const header = document.getElementById('header'),
  headerLoadBG = document.getElementById('headerLoadBG'),
  headerLoadBGName = document.getElementById('headerLoadBGName'),
  firstHeadline = document.getElementsByTagName('h1')[0]

/*

// Variables: Functions
let timeout = false, // holder for timeout id
    delay = 250; // delay after event is "complete" to run callback

*/

/*** Event Listeners ***/
window.addEventListener('load', windowLoad, false)
window.addEventListener('click', windowClick, false)

/*

window.addEventListener('keydown', keydown, false);
window.addEventListener('resize', function() {
  // clear the timeout
  clearTimeout(timeout);
  // start timing for event "completion"
  timeout = setTimeout(windowResize, delay);
});

*/

/*** Event Listeners' Functions ***/

// Apply Correct Styles on Window Load
var ua = window.navigator.userAgent
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
var webkit = !!ua.match(/WebKit/i)
var iOSSafari = iOS && webkit && !ua.match(/CriOS/i)

function windowLoad() {
  if (!iOSSafari) {
    if (window.location.href == 'https://www.brandonvernon.com/') {
      headerLoadBGName.style.opacity = '1'
    } else { // Remove for Prod
      headerLoadBGName.style.opacity = '1'
    }
    setTimeout(function () {
      headerLoadBG.style.height = '0px'
      headerLoadBGName.style.display = 'none'
    }, 1000)
    setTimeout(function () {
      firstHeadline.style.opacity = '1'
    }, 1500)
  } else if (iOSSafari) {
    headerLoadBG.style.height = '0px'
    headerLoadBGName.style.display = 'none'
    firstHeadline.style.opacity = '1'
  }
}

// Call Specific Functions on Click
function windowClick(e) {
  if (e.target === checkbox) {
    toggleMobileNav();
  } else {
    return
  }
}

/*

// Call Specific Functions on Keydown
function keydown(e) {
  if (e.keyCode === 13) {

  } else if (e.keyCode === 27) {

  };
};

function windowResize() {

};

*/

/*** Common Functions ***/
function toggleMobileNav() {
  if (checkbox.checked === true) {
    navMobile.style.height = '100VH'
  } else if (checkbox.checked === false) {
    setTimeout(function () {
      navMobile.style.height = '72px'
    }, 500)
  }
}

/*

// Tabindex
function tabindex(array, int) {
  for (let i = 0; i < array.length; i++) {
    array[i].tabIndex = int;
  };
};

// Disable Scroll
function disableScroll() {
  // Get the current page scroll position
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  // if any scroll is attempted, set this to the previous value
  window.onscroll = function() {
    window.scrollTo(scrollLeft, scrollTop);
  };
};

// Enable Scroll
function enableScroll() {
  window.onscroll = function() {};
};

*/

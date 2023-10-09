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

// Desktop: Nav
const navLinks = document.querySelectorAll('.nav-link')
const about = document.querySelector('#about'),
  portfolio = document.querySelector('#portfolio'),
  contact = document.querySelector('#contact')

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', sectionManager)
  navLinks[i].addEventListener('keyup', sectionManagerKey)
}

function sectionManager(e) {
  if (e.target.id === 'navAbout') {
    toggleSection(about)
    closeSections(about)
    document.querySelector('#linkedIn').focus()
  } else if (e.target.id === 'navPortfolio') {
    toggleSection(portfolio)
    closeSections(portfolio)
    document.querySelector('#halliburton').focus()
  } else if (e.target.id === 'navContact') {
    toggleSection(contact)
    closeSections(contact)
    document.querySelector('#email').focus()
  }
}

function sectionManagerKey(e) {
  e.preventDefault()
  if (e.key === 13) {
    if (e.target.id === 'navAbout') {
      toggleSection(about)
      closeSections(about)
      document.querySelector('#linkedIn').focus()
    } else if (e.target.id === 'navPortfolio') {
      toggleSection(portfolio)
      closeSections(portfolio)
      document.querySelector('#halliburton').focus()
    } else if (e.target.id === 'navContact') {
      toggleSection(contact)
      closeSections(contact)
      document.querySelector('#email').focus()
    }
  }
}

function toggleSection(s) {
  if (s.classList.contains('show')) {
    s.classList.remove('show')
  } else {
    s.classList.add('show')
  }
}

const navName = document.querySelector('#navName')

navName.addEventListener('click', function () {
  about.classList.remove('show')
  portfolio.classList.remove('show')
  contact.classList.remove('show')
})

navName.addEventListener('keyup', function (e) {
  e.preventDefault()
  if (e.key === 13) {
    about.classList.remove('show')
    portfolio.classList.remove('show')
    contact.classList.remove('show')
  }
})

function closeSections(ss) {
  if (ss === about) {
    portfolio.classList.remove('show')
    contact.classList.remove('show')
  } else if (ss === portfolio) {
    about.classList.remove('show')
    contact.classList.remove('show')
  } else {
    about.classList.remove('show')
    portfolio.classList.remove('show')
  }
}

document.addEventListener('keyup', function (e) {
  if (e.key === 9) {
    if (e.target.id === 'linkedIn') {
      about.classList.add('show')
      portfolio.classList.remove('show')
      contact.classList.remove('show')
    } else if (e.target.id === 'halliburton') {
      about.classList.remove('show')
      portfolio.classList.add('show')
      contact.classList.remove('show')
    } else if (e.target.id === 'email') {
      about.classList.remove('show')
      portfolio.classList.remove('show')
      contact.classList.add('show')
    } else if (e.target.id === 'ups') {
      about.classList.remove('show')
      portfolio.classList.add('show')
      contact.classList.remove('show')
    } else if (e.target.id === 'cv') {
      about.classList.add('show')
      portfolio.classList.remove('show')
      contact.classList.remove('show')
    }
  }
})

// Footer: Get current year
const year = document.querySelector('.year')
year.innerHTML = new Date().getFullYear()

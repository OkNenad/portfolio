///REQUIRE
var yo = require('yo-yo')
var minixhr = require('minixhr')
var csjs = require('csjs-inject')

///THEME
var FONT        = 'Roboto Condensed, sans-serif'
var BLACK       = 'hsla(0,0%,0%,1)'
var WHITE       = 'hsla(0,0%,100%,1)'
var BLUE        = '#05668D'
var LITEBLUE    = '#028090'
var GREEN       = '#00A896'
var LITEGREEN   = '#02C39A'
var BEIGE       = '#F0F3BD'
var MAIZE       = '#FFE66D'
var EGREEN      = '#1A535C'
var COLORS      = [EGREEN, BEIGE, MAIZE, BLUE]

///LOADING DATA
minixhr('https://api.github.com/users/OkNenad', responseHandler1)
function responseHandler1 (data) {
  document.body.appendChild(webpage({
    data: JSON.parse(data),
    theme: {
      font: FONT,
      black: BLACK,
      white: WHITE,
      blue: BLUE,
      liteblue: LITEBLUE,
      green: GREEN,
      litegreen: LITEGREEN,
      beige: BEIGE,
      maize: MAIZE,
      egreen: EGREEN,
      colors: COLORS
    }
  }))
  activateScrollEffect({ colors: COLORS })
}

/// LOADING FONT
var links = [
  'https://fonts.googleapis.com/css?family=Roboto+Condensed" rel="stylesheet',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
]
var font = yo`<link href=${links[0]} rel='stylesheet' type='text/css'>`
var fontAwesome = yo`<link href=${links[1]} rel='stylesheet' type='text/css'>`
document.head.appendChild(font)
document.head.appendChild(fontAwesome)

///WEB PAGE
function webpage ({ data = {}, theme = {} } = {}) {
  var css = csjs`
    body {
      text-align: center;
      background-color: ${theme.green};
      color: ${theme.black};
      font-family: ${theme.font};
    }
    h1 {
      margin-top: 1em;
      color: ${theme.beige};
      font-size: 4em;
      font-weight: bold;
      text-transform: uppercase;
    }
  	h3 {
      color: ${theme.beige};
      font-size: 3em;
      margin-bottom: 3em;
    }
    img {
      margin-top: 3em;
      border: 5px solid ${theme.beige};
      border-radius: 50%;
      width: 15em;
    }
  	@-webkit-keyframes bounce {
      0% {
        bottom: 50px;
      }
      70% {
        bottom: 100px;
        color: ${theme.liteblue};
      }
      100% {
        bottom: 50px;
      }
    }
    .arrow {
      position: relative;
      font-size: 3em;
      color: ${theme.beige};
      animation: bounce 2s infinite
    }
  `
  function template () {
  	return yo`
      <div>
      	<img src="${data.avatar_url}">
        <h1>${data.name}</h1>
        <h3>${data.bio}</h3>
        <div>
        <i class="${css.arrow} fa fa-chevron-down" aria-hidden="true"></i>
        </div>
        ${portfolioComponent({ theme: theme })}
    		${textboxComponent({ theme: theme })}
    		${footerComponent({ theme: theme })}
      </div>
    `
  }
  var element = template()
  return element
}

/// PORTFOLIO COMPONENT
function portfolioComponent ({ data = {}, theme = {} } = {}) {
	var css = csjs`
  	.portfolio {
      margin   : 2em 0 2em 0;
      width    : 100%;
    }
    .portfolioItem     {
      width            : 100%;
      padding-bottom   : 200px;
    	background-color : ${theme.blue};
      color            : ${theme.beige};
      display          : flex;
      flex-direction   : column;
      align-items      : flex-start;
      transition       : 2s;
    }
    .portfolioItem_isHover {
      width                : 100%;
      padding-bottom       : 200px;
    	background-color     : ${theme.blue};
      color                : ${theme.green};
      display              : flex;
      flex-direction       : column;
      align-items          : flex-start;
      cursor               : pointer;
      transition           : 2s;
    }
    .portfolioTitle    {
      margin           : 2em;
      padding          : 0.5em;
      font-size        : 3em;
      color            : ${theme.egreen};
      background-color : ${theme.maize};
      border-radius    : 4px;
      border           : 4px solid ${theme.yellow};
      transition       : 2s;
    }
    .portfolioTitle_isHover {
      margin                : 2em 2em 2em 1.5em;
      padding               : 0.5em;
      font-size             : 3em;
      color                 : ${theme.egreen};
      background-color      : ${theme.liteblue};
      border-radius         : 4px;
      border                : 4px solid ${theme.beige};
      transition            : 2s;
    }
    .portfolioBody {
      margin       : 0 40% 0 0em;
      text-align   : left;
      font-size    : 1.2em;
      color        : ${theme.blue};
      transition   : 2s;
    }
    .portfolioBody_isHover {
      margin               : 0 35% 0 4em;
      text-align           : left;
      font-size            : 1.2em;
      color                : ${theme.white};
      transition           : 2s;
    }
  `
  function template () {
    return yo`
      <div onmouseover=${hoverPortfolio}>
        <div class="${css.portfolio}">
          <div class="${css.portfolioItem}">
            <div class="${css.portfolioTitle}">
              wana try quiz ?
            </div>
            <div class="${css.portfolioBody}">
             This quiz is a small app where users can answer
              Likert scale questions and compare their answers
              with others. It stores all the data in the database
              and enables an admin view of all the answers.
             </div>
          </div>
        </div>
      </div>
    `
  }
  function hoverPortfolio () {
    var newElement = yo`
      <div onmouseout=${unhoverPortfolio} onclick=${openNewTab}>
        <div class="${css.portfolio}">
          <div class="${css.portfolioItem_isHover}">
            <div class="${css.portfolioTitle_isHover}">
              go on try it
            </div>
            <div class="${css.portfolioBody_isHover}">
              This quiz is a small app where users can answer
              Likert scale questions and compare their answers
              with others. It stores all the data in the database
              and enables an admin view of all the answers.
             </div>
          </div>
        </div>
      </div>
    `
    yo.update(element, newElement)
  }
  function unhoverPortfolio() { yo.update(element, template()) }
  function openNewTab() {
              var url = "https://oknenad.github.io/quiz/"
    var tab = window.open(url, '_blank')
    tab.focus()
  }
  var element = template()
  return element
}

///TEXTBOX COMPONENT
function textboxComponent ({ data = {}, theme = {} } = {}) {
  var css = csjs`
  .textbox {
    margin: 5em 25% 3em 25%;
    color: ${theme.grey};
    font-size: 2em;
    line-height: 1.5em;
    text-align: justify;
  }
  `
  function template () {
    return yo`
      <div>
        <div class="${css.textbox}">
          Check out stuff I do and get in touch.
        </div>
      </div>
    `
  }
  var element = template()
  return element
}



///FOOTER COMPONENT
function footerComponent ({ data = {}, theme = {} } = {}) {
	var css = csjs`
  	.container {
      display: flex;
      justify-content: center;
    }
    .icon {
      padding: 1em;
      font-size: 35px;
      color: ${theme.grey};
    }
    .icon:hover {
      opacity: 0.4;
    }
  `
  function template () {
    return yo`
    <div class="${css.container}">
      <a href="https://github.com/OkNenad">
        <i class="${css.icon} fa fa-github" aria-hidden="true"></i>
      </a>
        <a href="mailto:nokiljevic@yahoo.com ">
        <i class="${css.icon} fa fa-envelope-o" aria-hidden="true"></i>
      </a>
      <a href="https://www.facebook.com/nokiljevic">
       <i class="${css.icon} fa fa-facebook" aria-hidden="true"></i>
      </a>
    </div>
    `
  }
  var element = template()
  return element
}

/// HELPERS
function activateScrollEffect ({ colors = [] } = {}) {
  var docHeight = (document.height !== undefined) ?
    document.height
  	: document.body.offsetHeight
	var step = docHeight/colors.length
  window.addEventListener("scroll", function(event) {
  	var position = document.documentElement.scrollTop || document.body.scrollTop
    var i = Math.floor(position/step)
    var currentColor = colors[i]
    document.body.style.backgroundColor = currentColor
    document.body.style.transition = "background-color 3s"
  })
}

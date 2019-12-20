/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var State = __webpack_require__(/*! ./js/state */ "./src/js/state.js");

var ui = __webpack_require__(/*! ./js/ui */ "./src/js/ui.js");

var app = document.querySelector('#app');
var head = document.querySelector('.head');
var state = new State(app);

function main() {
  var cal = calendar();
  state.addView('calendar', cal);
  state.changeView('calendar');
  head.addEventListener('click', function (e) {
    state.changeView('calendar');
  });
}

function journal(date) {
  var dom = document.createDocumentFragment();
  return dom;
}

function calendar() {
  var dom = document.createDocumentFragment();
  var cal = ui.makeCalendar();
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;

  for (var i = month; i < 12 + month; i++) {
    var m = new Date(year, i, 0);

    var _month = ui.makeMonth(m);

    var _loop = function _loop(j) {
      var d = new Date(m.getFullYear(), m.getMonth(), j);

      if (j == 1) {
        _month.childNodes[2].appendChild(ui.makeOffset(d.getDay()));
      }

      var day = ui.makeDay(d);
      day.addEventListener('click', function (e) {
        var key = d.toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        });
        if (!state.isView(key)) state.addView(key, ui.makeJournal(d));
        state.changeView(key);
      });

      _month.childNodes[2].appendChild(day);
    };

    for (var j = 1; j < m.getDate() + 1; j++) {
      _loop(j);
    }

    cal.appendChild(_month);
  }

  dom.appendChild(cal);
  var todayDom = dom.querySelector("[data-date=\"".concat(today.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }), "\"]"));
  ui.getToday(todayDom);
  return dom;
}

window.addEventListener('load', main);

/***/ }),

/***/ "./src/app.scss":
/*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/js/state.js":
/*!*************************!*\
  !*** ./src/js/state.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function State(dom) {
    _classCallCheck(this, State);

    this.dom = dom;
  }

  _createClass(State, [{
    key: "isView",
    value: function isView(key) {
      return document.querySelector("[data-key=\"".concat(key, "\"]"));
    }
  }, {
    key: "addView",
    value: function addView(key, view) {
      var state = document.createElement('div');
      state.classList.add('view');
      state.style.display = "none";
      state.dataset.key = key;
      state.appendChild(view);
      this.dom.appendChild(state);
    }
  }, {
    key: "changeView",
    value: function changeView(key) {
      document.querySelectorAll('.view').forEach(function (v) {
        return v.style.display = 'none';
      });
      document.querySelector("[data-key=\"".concat(key, "\"]")).style.display = 'block';
    }
  }]);

  return State;
}();

/***/ }),

/***/ "./src/js/ui.js":
/*!**********************!*\
  !*** ./src/js/ui.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var ui = {
  makeCalendar: function makeCalendar() {
    var cal = document.createElement('div');
    cal.classList.add('calendar');
    return cal;
  },
  makeMonth: function makeMonth(month) {
    var m = document.createElement('div');
    m.classList.add('month');
    var n = document.createElement('div');
    n.classList.add('month-name');
    n.textContent = new Intl.DateTimeFormat('en-us', {
      month: "long",
      year: "numeric"
    }).format(month);
    m.appendChild(n);
    m.appendChild(ui.addLabels());
    var g = document.createElement('div');
    g.classList.add('month-months');
    m.appendChild(g);
    return m;
  },
  makeDay: function makeDay(date) {
    var d = document.createElement('div');
    d.classList.add('date');
    d.textContent = date.getDate();
    d.dataset.date = date.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    return d;
  },
  makeOffset: function makeOffset(offset) {
    var o = document.createDocumentFragment();

    for (var i = 0; i < offset; i++) {
      var offsetBlock = document.createElement('div');
      offsetBlock.classList.add('offset-block');
      offsetBlock.innerHTML = "00";
      o.appendChild(offsetBlock);
    }

    return o;
  },
  addLabels: function addLabels() {
    var dayLabel = document.createElement('div');
    dayLabel.classList.add('days-labels');
    var labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    labels.forEach(function (l) {
      var label = document.createElement('div');
      label.classList.add('label');
      label.textContent = l;
      dayLabel.appendChild(label);
    });
    return dayLabel;
  },
  getToday: function getToday(dom) {
    dom.classList.add('today');
    return dom;
  },
  makeJournal: function makeJournal(date) {
    var dom = document.createElement('div');
    dom.classList.add('journal');
    var heading = document.createElement('div');
    heading.classList.add('journal-heading');
    heading.textContent = date.toLocaleDateString('en-us', {
      month: 'long',
      day: 'numeric'
    });
    dom.appendChild(heading);
    var editor = document.createElement('textarea');
    editor.classList.add('journal-editor');
    dom.appendChild(editor);
    return dom;
  }
};
module.exports = ui;

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi ./src/app.js ./src/app.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/oliver/Documents/Projects/calendar/src/app.js */"./src/app.js");
module.exports = __webpack_require__(/*! /Users/oliver/Documents/Projects/calendar/src/app.scss */"./src/app.scss");


/***/ })

/******/ });
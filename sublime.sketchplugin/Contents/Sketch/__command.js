var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/command.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/command.js":
/*!************************!*\
  !*** ./src/command.js ***!
  \************************/
/*! exports provided: onDocumentChanged, on, off */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onDocumentChanged", function() { return onDocumentChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var sketch = __webpack_require__(/*! sketch */ "sketch");

var MESSAGES = {
  change: {
    0: ['Así no es lo suficientemente sublime', 'Antes era más sublime', 'Aún podría ser más sublime', 'Mmm… ese cambio es poco sublime']
  },
  name: {
    0: ['Este texto no es sublime', 'Este texto podría ser más sublime', '¡Qué poco sublime!']
  },
  insert: {
    0: ['¡Este diseño no es sublime!', 'No deberías haber añadido esto', 'Esta es una decisión muy poco sublime', 'Te estás alejando de lo sublime', 'Esto está lejos de ser sublime', 'Tu diseño es cada vez menos sublime']
  },
  general: {
    0: ['Así no', '¡Mal!', 'No es lo suficientemente sublime', 'Bah, ¡no es lo suficientemente sublime!', 'Persevera, puede ser más sublime', 'Te sigues alejando de lo sublime', 'Te alejas de lo sublime', 'Este diseño no es sublime', 'Mal, este diseño no es sublime', 'Todavía es poco sublime']
  },
  delete: {
    0: ['Aún no es sublime', 'Todavía es poco sublime', 'Buen intento, pero aún no es sublime'],
    1: ['¡Lo has logrado! Tu diseño es por fin sublime.', '¡Lo conseguiste! Tu diseño es por fin sublime.', '¡Felicidades! Tu diseño es por fin sublime.']
  },
  color: {
    0: ['Ese color no es sublime.', '{{color}} no es sublime.', '¡Qué color tan poco sublime!', '{{color}} no es lo suficientemente sublime.'],
    1: ['Sigue así', 'Mejor']
  },
  points: {
    0: ['No es lo suficientemente sublime'],
    1: ['Mejor', 'Sigue así']
  },
  opacity: {
    0: ['Todo el mundo sabe que {{opacity}} de opacidad no es sublime', 'Demasiado opaco para ser sublime'],
    1: ['Ahora es sublime', 'Mucho más sublime así', 'Bien hecho', 'Vas por el buen camino', 'Kant estaría orgulloso de ti', 'Mejor']
  }
};

var getLayerCount = function getLayerCount() {
  return selectedPage.sketchObject.children().length - 1;
};

var getMessage = function getMessage() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'general';
  var mode = arguments.length > 1 ? arguments[1] : undefined;
  var value = arguments.length > 2 ? arguments[2] : undefined;
  var messages = MESSAGES[type][mode];
  var regexp = new RegExp("{{W*".concat(type, ":?.*?}}"), 'g');
  var message = messages[Math.floor(Math.random() * messages.length)];
  return value ? message.replace(regexp, value) : message;
};

var onDefault = function onDefault(type) {
  var message = getMessage('general', 0);
  sketch.UI.message(message);
};

var document = sketch.getSelectedDocument();
var selectedPage = document.selectedPage;

var onChange = function onChange(change, path) {
  var mode = 0;
  var type = undefined;
  var value = eval("document.".concat(path));

  if (change && change.propertyName && change.propertyName() == 'frame') {
    type = 'change';
    mode = 0;
  } else if (path.includes('insert')) {
    type = 'insert';
    mode = 0;
  } else if (path.includes('name')) {
    type = 'name';
    mode = 0;
  } else if (path.includes('color')) {
    type = 'color';
    mode = value.includes('ffffff') ? 1 : 0;
  } else if (path.includes('opacity')) {
    value = value.toFixed(2);
    type = 'opacity';

    if (value < 0.03) {
      mode = 1;
    }
  } else if (path.includes('points')) {
    type = 'points';
    value = value.map(function (p) {
      return p.cornerRadius;
    }).reduce(function (a, i) {
      return a + i;
    });
    mode = value >= 66 * 4 - 1 ? 1 : 0;
  }

  var message = getMessage(type, mode, value);
  sketch.UI.message(message);
};

var onDelete = function onDelete(change, path) {
  if (change.isMove()) {
    return;
  }

  var mode = 0;

  if (getLayerCount() <= 0) {
    mode = 1;
  }

  var message = getMessage('delete', mode, getLayerCount());
  sketch.UI.message(message);
};

var onAdd = function onAdd(change, path) {
  var message = getMessage('insert', 0);
  sketch.UI.message(message);
};

function onDocumentChanged(context) {
  var changes = context.actionContext;
  var isActivated = Settings.sessionVariable('sublime');

  if (!isActivated) {
    return;
  }

  for (var i = 0; i < changes.length; i++) {
    var change = changes[i];
    var path = change.fullPath();
    var type = change.type();

    switch (type) {
      case 1:
        onChange(change, path);
        break;

      case 2:
        onDelete(change, path);
        break;

      case 3:
        onAdd(change, path);
        break;

      default:
        onDefault(type);
    }
  }
}
function on(context) {
  Settings.setSessionVariable('sublime', true);
  sketch.UI.message('Adelante, diseña');
}
function off(context) {
  Settings.setSessionVariable('sublime', false);
  sketch.UI.message('Vale, ya me callo');
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onDocumentChanged'] = __skpm_run.bind(this, 'onDocumentChanged');
globalThis['onRun'] = __skpm_run.bind(this, 'default');
globalThis['on'] = __skpm_run.bind(this, 'on');
globalThis['off'] = __skpm_run.bind(this, 'off')

//# sourceMappingURL=__command.js.map
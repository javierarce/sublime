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
/*! exports provided: onDocumentChanged, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onDocumentChanged", function() { return onDocumentChanged; });
var sketch = __webpack_require__(/*! sketch */ "sketch");

var MESSAGES = {
  general: ['No es lo suficientemente sublime', 'Así no', 'Persevera', 'Todavía es poco sublime'],
  delete: ['delete 1', 'delete 2'],
  color: ['Color 1', 'Color 2'],
  points: ['points 1', 'points 2'],
  opacity: ['opacity 1', 'opacity 2']
};

var getLayerCount = function getLayerCount() {
  return selectedPage.sketchObject.children().length - 1;
};

var getMessage = function getMessage(type, value) {
  var messages = [];

  if (!type) {
    messages = MESSAGES['general'];
  } else {
    messages = MESSAGES[type];
  }

  return messages[Math.floor(Math.random() * messages.length)];
};

var onDefault = function onDefault(type) {
  sketch.UI.message("\u26A0\uFE0F Unexpected change type ".concat(type));
};

var document = sketch.getSelectedDocument();
var selectedPage = document.selectedPage;

var onChange = function onChange(change, path) {
  var type = undefined;
  var value = undefined;

  if (path.includes('color')) {
    value = eval("document.".concat(path));
    type = 'color';
  } else if (path.includes('opacity')) {
    value = eval("document.".concat(path)).toFixed(2);
    type = 'opacity';
  } else if (path.includes('points')) {
    type = 'radius';
    var points = eval("document.".concat(path));
    value = points.map(function (p) {
      return p.cornerRadius;
    }).reduce(function (a, i) {
      return a + i;
    });
  }

  var message = getMessage(type, value);
  sketch.UI.message(message);
};

var onDelete = function onDelete(change, path) {
  if (change.isMove()) {
    return;
  }

  var message = getMessage('delete', getLayerCount());
  sketch.UI.message(message);
};

var onAdd = function onAdd(change, path) {
  if (change.isMove()) {
    var from = change.associatedChange().fullPath();
    sketch.UI.message("Object moved from ".concat(from, " to ").concat(path));
  } else {
    sketch.UI.message("New object inserted at ".concat(getLayerCount()));
  }
};

function onDocumentChanged(context) {
  var changes = context.actionContext;

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
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var document = sketch.getSelectedDocument();
  var selectedLayers = document.selectedLayers;
  var selectedCount = selectedLayers.length;
  var selectedPage = document.selectedPage;
  var children = selectedPage.sketchObject.children();
  console.log(children);

  if (children && children.length) {
    sketch.UI.message(children.length);
  }
});

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

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
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__command.js.map
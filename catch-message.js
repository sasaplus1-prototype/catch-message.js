/*!
 * @license catch-message.js ver.1.0.0 Copyright(c) 2016 sasa+1
 * https://github.com/sasaplus1-prototype/catch-message.js
 * Released under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["catchMessage"] = factory();
	else
		root["catchMessage"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isFunction = __webpack_require__(3);

	var eventListener = __webpack_require__(1);

	var origin = __webpack_require__(2).get();

	var settings = [];

	/**
	 * event handler for onmessage
	 *
	 * @param {Event} event
	 */
	function onMessage(event) {
	  var i, len, setting, handler, options, targetOrigin, err, data;

	  for (i = 0, len = settings.length; i < len; ++i) {
	    setting = settings[i];

	    if (!setting) {
	      continue;
	    }

	    handler = setting.handler;
	    options = setting.options || {};

	    targetOrigin = options.origin || origin;

	    if (event.origin === targetOrigin) {
	      err = null;

	      if (options.json) {
	        try {
	          data = JSON.parse(event.data);
	        } catch(e) {
	          err = e;
	        }
	      } else {
	        data = event.data;
	      }

	      handler(err, data);
	    }
	  }
	}

	/**
	 * add event handler for onMessage
	 *
	 * @param {Function} handler
	 * @param {Object} [options]
	 * @param {Boolean} [options.json]
	 * @param {String} [options.origin]
	 * @throws {TypeError}
	 */
	function catchMessage(handler, options) {
	  if (!isFunction(handler)) {
	    throw new TypeError('handler must be a Function');
	  }

	  settings.push({
	    handler: handler,
	    options: options
	  });
	}

	/**
	 * add event handler
	 */
	eventListener.on(window, 'message', onMessage, false);

	module.exports = catchMessage;


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var off = (typeof removeEventListener !== 'undefined') ?
	  function off(element, eventName, callback, capture) {
	    return element.removeEventListener(eventName, callback, capture);
	  } :
	  function off(element, eventName, callback) {
	    return element.detachEvent('on' + eventName, callback);
	  };

	var on = (typeof addEventListener !== 'undefined') ?
	  function on(element, eventName, callback, capture) {
	    return element.addEventListener(eventName, callback, capture);
	  } :
	  function on(element, eventName, callback) {
	    return element.attachEvent('on' + eventName, callback);
	  };

	function once(element, eventName, callback, capture) {
	  var handler = function() {
	    off(element, eventName, handler, capture);

	    switch (arguments.length) {
	      case 0:
	        return callback.call(this);
	      case 1:
	        return callback.call(this, arguments[0]);
	      case 2:
	        return callback.call(this, arguments[0], arguments[1]);
	      case 3:
	        return callback.call(this, arguments[0], arguments[1], arguments[2]);
	      default:
	        return callback.apply(this, arguments);
	    }
	  };

	  return on(element, eventName, handler, capture);
	}

	module.exports = {
	  off: off,
	  on: on,
	  once: once
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var loc;

	function get() {
	  loc || (loc = window.location);

	  return loc.origin || (
	    loc.protocol + '//' + loc.hostname + (loc.port !== '' ? ':' + loc.port : '')
	  );
	}

	module.exports = {
	  get: get
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString;

	module.exports = function isFunction(value) {
	  return (
	    typeof value === 'function' || toString.call(value) === '[object Function]'
	  );
	};


/***/ }
/******/ ])
});
;
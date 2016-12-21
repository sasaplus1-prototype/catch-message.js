'use strict';

var isFunction = require('type-check/is-function');

var eventListener = require('event-listener');

var origin = require('location-origin').get();

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

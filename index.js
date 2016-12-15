'use strict';

var eventListener = require('event-listener');

var origin = require('location-origin').get();

var handlers = [];

/**
 * event handler for onMessage
 *
 * @param {Event} event
 */
function onMessage(event) {
  var i, len, handler, options, targetOrigin, data;

  for (i = 0, len = handlers.length; i < len; ++i) {
    handler = handlers[i].handler;
    options = handlers[i].options;

    targetOrigin = options.origin || origin;

    if (event.origin === targetOrigin) {
      if (options.json) {
        try {
          data = JSON.parse(event.data);
        } catch(e) {
          console.error(e);
        }
      } else {
        data = event.data;
      }

      handler(data);
    }
  }
}

/**
 * add event handler for onMessage
 *
 * @param {Function} handler
 * @param {Object} options
 * @param {Boolean} options.json
 * @param {String} options.origin
 */
function catchMessage(handler, options) {
  handlers.push({
    handler: handler,
    options: options
  });
}

/**
 * add event handler
 */
eventListener.on(window, 'message', onMessage, false);

module.exports = catchMessage;

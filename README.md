# catch-message.js

sweet onmessage

## Installation

```sh
$ npm install sasaplus1-prototype/catch-message.js
```

## Usage

via `require()`

```js
var catchMessage = require('catch-message');
```

via `<script>`

```html
<script src="catch-message.min.js"></script>
```

### Example

```js
catchMessage(function(err, data) {
  if (err) {
    throw err;
  }

  // ...
});
```

## Functions

### catchMessage(handler[, options])

- `handler`
  - `Function`
- `options`
  - `Object`
- `options.json`
  - `Boolean`
- `options.origin`
  - `String`

## License

The MIT license.

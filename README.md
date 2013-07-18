# lamernews-api

[![Build Status](https://secure.travis-ci.org/sbruchmann/lamernews-api.png?branch=master)](http://travis-ci.org/user/lamernews-api)


## Installation

Install with npm:

```
npm install --save lamernews-api
```

## API

### new LamernewsAPI(root);

Instantiates a new `LamernewsAPI` object and set its `root` property.

#### Parameters

##### `root` (required) [String]

The root of the API. For example, if you want to use the API of [EchoJS](http://echojs.com),
you have to set `http://echojs.com/` as `root`.

#### Usage

```javascript
"use strict";

var LamernewsAPI = require("lamernews-api");

var api = new LamernewsAPI("http://echojs.com/api/");
```

---

### LamernewsAPI#getNews(options, callback)

Returns news asynchronously.

#### Parameters

##### `options` (optional) [Object]

  * `count` [Number]: How many news should be returned
    (default: `30`, max: `30`)
  * `start` [Number]: Return news starting at `start` (default: 0)
  * `type` [String]: `top` or `latest` (default: `latest`)

##### `callback(err, response)` (required) [Function]

  * `err` [Null, Error]
  * `response` [Object]

#### Usage

```javascript
"use strict";

var LamernewsAPI = require("lamernews-api");

var api = new LamernewsAPI("http://echojs.com/api/");
var options = {
  count: 5,
  type: "top"
};

api.getNews(options, function onDone(err, response) {
    if (err) {
        throw err;
    }

    console.log(response.news);
});
```

---

### LamernewsAPI#query(signature, callback)

Performs a asynchronous API query.

#### `signature` (String)

API signature.
Please take a look at the source of [Lamernews](https://github.com/antirez/lamernews/blob/master/app.rb#L645:L1317)
for documentation.

##### `callback(err, response)` (required) [Function]

  * `err` [Null, Error]
  * `response` [Object]

#### Usage

```javascript
"use strict";

var LamernewsAPI = require("lamernews-api");

var api = new LamernewsAPI("http://echojs.com/api/");
var signature = "/login?username=sbruchmann&password=thisisnotmypassword";

api.query(signature, function onDone(err, response) {
    if (err) {
        throw err;
    }

    console.log(response);
});
```

## Testing

From the repo root:

```
npm install
npm test
```

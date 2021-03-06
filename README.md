#Introduction

asynchronous queue with retry(only peek at first, on success take) javascript implementation.

#TOC

- [Installation](#installation)
- [Example](#example)
- [API](#api)
- [Code coverage](#code-coverage)
- [Acknowledgement](#acknowledgement)

#Installation

1. Install [node.js](http://nodejs.org/)(assume you have allready)
2. `npm install queuetry`

#Example

playable at [tonic](https://tonicdev.com/npm/queuetry)

```javascript
var Q = require('queuetry')
var q = Q()
var i = 0
var res = []

// put first synchronously (before get).
q.put("a")

// get what was allready put (above).
q.getAsync(function(item) {
    var j = [i++, item]
    console.log(j) // [0, 'a']
    res.push(j)
    return true // deleted from queue.
})

// async get because no put
q.getAsync(function(item) {
    var j = [i++, item]
    console.log(j) // [1, 'b']
    res.push(j)
    return false // peeked from queue, next successfull getAsync() will delete.
})

// async get because no put
q.getAsync(function(item) {
    var j = [i++, item] // [2, 'b']
    console.log(j)
    res.push(j)
    return true
})

q.put("b") // put after get.

// Expected output =>
// [ 0, 'a' ]
// [ 1, 'b' ]
// [ 2, 'b' ]
```

#API
- [`Queuetry()`](#queuetry)
- [`Queuetry(capacity)`](#queuetrycapacity)
- [`put(item)`](#putitem)
- [`getAsync(f)`](#getasyncf)

####Queuetry
Creates queue with retry with capacity of 16.

####Queuetry(int capacity)
Creates a queue with retry with length of len.

####put(item)
Put item in queue.

####getAsync(f)
take item from queue, but only if f returns true.

#Code coverage

```
======== Coverage summary ========
Statements   : 100% ( 17/17 )
Branches     : 100% ( 6/6 )
Functions    : 100% ( 3/3 )
Lines        : 100% ( 17/17 )
==================================
```

#Acknowledgement

Many thanks to in no particular order:

- [Node.js](http://nodejs.org) for server-side javascript[(V8)](https://developers.google.com/v8/?hl=en)
- [Github](https://github.com) for providing my [project](https://github.com/alfredwesterveld/javascript-queuetry)
- Petka Antonov for [deque](https://github.com/petkaantonov/deque) and for template README/LICENSE
- [Browserify](https://www.npmjs.com/package/browserify) for making this package available on client-side
- [npm](https://www.npmjs.com/) for hosting my [package](.
- [Mocha](https://mochajs.org/) for testing my code.
- [Istanbal](https://github.com/gotwarlost/istanbul) for test coverage.
- [Tonic](https://tonicdev.com) for providing [playable snippet](https://tonicdev.com/npm/queuetry).

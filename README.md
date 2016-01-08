#Introduction

asynchronous queue with retry(only peek at first, on success take) javascript implementation.

#TOC

- [Installation](#installation)
- [Example](#example)
- [API](#api)
- [Code coverage](#code-coverage)
- [Acknowledgement](#acknowledgement)

#Installation

1. Install node.js if not allready
2. `npm install queuetry`

#Example (tryable at [tonic](https://tonicdev.com/npm/queuetry))

```javascript
var assert = require('assert')
var Q = require('queuetry')
var q = Q()
var i = 0
var res = []

// put first synchronously.
q.put("a")

// get what was allready put
q.getAsync(function(item) {
    res.push([i++, item])
    return true // really deleted from queue
})

// async get because no put
q.getAsync(function(item) {
    res.push([i++, item])
    return false // not deleted from queue, next getAsync() will get this message
})

// async get because no put
q.getAsync(function(item) {
    res.push([i++, item])
    return true
})

q.put("b") // put after get.o

// before exit we check
process.on('exit', function () {
    assert.deepEqual(res, [
        [0, "a"],
        [1, "b"],
        [2, "b"]
    ])
})
```

#API
- [`Queuetry()`](#queutry)
- [`Queuetry(len)`](#queuetrylen)
- [`put(item)`](#putitem)
- [`getAsync(f)`](#getasyncf)

####Queeutry
Creates queue with retry with len of 16.

####Queeutry(len)
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

- Node.js for server-side javascript
- Petka Antonov for deque and for template README/LICENSE
- Browserify for making this package available on client-side
- npm for hosting my package.
- Mocha for testing my code.
- Istanbal for test coverage.

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

q.put("b") // put after get.

// before exit we check
process.on('exit', function () {
    console.log(res)
    assert.deepEqual(res, [
        [0, "a"],
        [1, "b"],
        [2, "b"]
    ])
})

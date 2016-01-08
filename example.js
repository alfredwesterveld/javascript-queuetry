var assert = require('assert')
var Q = require('queuetry')
var q = Q()
var i = 0
var res = []

// put first synchronously.
q.put("a")

// get what was allready put("a") above.
q.getAsync(function(item) {
    res.push([i++, item]) // => [0, "a"]
    return true // really deleted from queue
})

// async get put("b") below.
q.getAsync(function(item) {
    res.push([i++, item]) // => [1, "b"]
    return false // not deleted from queue, next getAsync() will get this message
})

// async get put("b") below because previous  getAsync failed
q.getAsync(function(item) {
    res.push([i++, item]) // => [2, "b"]
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

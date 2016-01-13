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

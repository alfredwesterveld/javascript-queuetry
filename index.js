var Deque = require('double-ended-queue')
var QueueTry = require('./queuetry')

module.exports = function (capacity) {
    var queue = new Deque(capacity)
    var async = new Deque(capacity)
    return QueueTry(queue, async)
}

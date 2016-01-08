var Deque = require('double-ended-queue')
var QueueTry = require('./queuetry')

module.exports = function (len) {
    var queue = new Deque(len)
    var async = new Deque(len)
    return QueueTry(queue, async)
}

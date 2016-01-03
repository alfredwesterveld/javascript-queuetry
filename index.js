"use strict"

const Deque = require("double-ended-queue")

module.exports = function (len) {
    let queue   = new Deque(len || 16)
    let async   = new Deque(len || 16)
    
    var put = function(elm) {
        let item = async.shift()
        
        while (item) {
            if (item(elm)) {
                return true
            }
            item = async.shift()
        }
        
        queue.push(elm)
    }
    
    var getAsync = function (f) {
        var item = queue.peekFront()
        if (item && f(item)) {
            queue.shift()
            return true
        }
        async.push(f)
        return false
    }
     
    return Object.freeze({
        put: put,
        getAsync: getAsync
    })      
}

var QueueTry = module.exports = function (_queue, _async) {
    var queue = _queue
    var async = _async 
    
    return Object.freeze({
        /**
         * put elm in queue
         */
        put: function(elm) {
            var item = async.shift()
            while (item) {
                if (item(elm)) {
                    // return else it will add elm to queue           
                    return queue.length
                }
                item = async.shift()
            }
            
            queue.push(elm)
            return queue.length           
        },
        
        /**
         * takes element from queue but only if f return true
         */        
        getAsync: function (f) {
            var item = queue.peekFront()
            if (item && f(item)) {
                queue.shift()
                return true
            }
            async.push(f)
            return false
        }
    })      
}

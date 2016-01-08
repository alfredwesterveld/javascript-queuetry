"use strict"

const assert = require('assert')
const Queue = require('./../queuetry')
var Deque = require('double-ended-queue')

describe("#put()", function () {
    let q = null
    var q1 = null
    var a1 = null
    
    beforeEach(function (done) {
        q1 = new Deque()
        a1 = new Deque()
        q = new Queue(q1, a1)
        done()
    })
    
    it("Should have put", function (done) {
        q.put(1)
        q.put(2)
        assert.equal(q1.length, 2)
        assert.equal(a1.length, 0)
        done()
    })
})

describe("getAsync", function () {
    let q = null
    let q1 = null
    let a1 = null
    
    beforeEach(function (done) {
        q1 = new Deque()
        a1 = new Deque()
        q = new Queue(q1, a1)
        done()
    })

    
    it("sync single", function (done) {
        q.put(1)
        q.getAsync(function (elm) {
            assert.equal(elm, 1)
            done()
        })
    })
    
    it("sync multiple", function (done) {
        const res = []
        
        q.put(1)
        q.put(2)
        
        function cb() {
            assert.equal(q1.length, 0)
            assert.equal(a1.length, 0)
            done()                    
        }
        
        q.getAsync(function (elm) {
            res.push(elm)
            return true
        })
        
        q.getAsync(function (elm) {
            res.push(elm)
            assert.deepEqual(res, [1,2])
            process.nextTick(cb)
            return true
        })
        
        
    })
    
    it("async sync multiple", function (done) {
        const res = []
        
        q.put(1)
        q.put(2)
        
        q.getAsync(function (elm) {
            res.push(elm)
            return true
        })
        
        q.getAsync(function (elm) {
            res.push(elm)
            assert.deepEqual(res, [1, 2])
            process.nextTick(done)
            return true
        })
    })

    it("async async multiple failing", function (done) {
        const res = []
        
        function beforeDone() {
            assert.equal(q1.length, 0)
            assert.equal(a1.length, 0)
            done()
        }
        q.getAsync(function (elm) {
            res.push(elm)
            return false
        })
        
        q.getAsync(function (elm) {
            res.push(elm)
            return false
        })
        
        q.getAsync(function (elm) {
            res.push(elm)
            assert.deepEqual(res, [1, 1, 1])
            process.nextTick(beforeDone)
            return true
        })
        
        q.put(1)
    })
    
    it("async sync multiple succeeding", function (done) {
        const res = []
        
        q.getAsync(function (elm) {
            res.push(elm)
            return true
        })
        
        q.getAsync(function (elm) {
            res.push(elm)
            assert.deepEqual(res, [1, 2])
            process.nextTick(done)
            return true
        })
        
        q.put(1)
        q.put(2)
    })
})

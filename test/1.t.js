"use strict"

const assert = require('assert')
const Queue = require('./../')

describe("#put()", function () {
    it("Should have put", function (done) {
        const q = Queue()
        q.put(1)
        q.put(2)
        done()
    })
})

describe("getAsync", function () {
    it("sync single", function (done) {
        const q = Queue()
        
        q.put(1)
        
        q.getAsync(function (elm) {
            assert.equal(elm, 1)
            done()
        })
    })
    
    it("async sync multiple", function (done) {
        const res = []
        const q = Queue()
        
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
        const q = Queue()
        
        q.getAsync(function (elm) {
            res.push(elm)
            return false
        })
        
        q.getAsync(function (elm) {
            res.push(elm)
            assert.deepEqual(res, [1, 1])
            process.nextTick(done)
            return true
        })
        
        q.put(1)
    })
    
    it("async async multiple failing", function (done) {
        const res = []
        const q = Queue()
        
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
            process.nextTick(done)
            return true
        })
        
        q.put(1)
    })
    
    it("async sync multiple succeeding", function (done) {
        const res = []
        const q = Queue()
        
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

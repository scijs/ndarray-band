'use strict'

var assert = require('chai').assert,
    band = require('../lib'),
    ndarray = require('ndarray'),
    diag = require('ndarray-diagonal'),
    ndt = require('ndarray-tests'),
    iota = require('iota-array'),
    show = require('ndarray-show')


var A

describe( "1D", function() {
  var A;

  beforeEach(function() {
    A = ndarray([1,2,3,4])
  })

  it("band(A)",function() {
    assert( ndt.equal( band(A), A ) )
  })
})

describe( "2D (square)", function() {

  beforeEach(function() {
    // [ 1, 2, 3 ]
    // [ 4, 5, 6 ]
    // [ 7, 8, 9 ]
    A = ndarray([1,2,3,4,5,6,7,8,9],[3,3])
  })

  it("band(A, -4)",function() { assert( ndt.equal( band(A,-4), ndarray([])     ))})
  it("band(A, -3)",function() { assert( ndt.equal( band(A,-3), ndarray([])     ))})
  it("band(A, -2)",function() { assert( ndt.equal( band(A,-2), ndarray([3])    ))})
  it("band(A, -1)",function() { assert( ndt.equal( band(A,-1), ndarray([2,6])  ))})
  it("band(A,  0)",function() { assert( ndt.equal( band(A, 0), ndarray([1,5,9])))})
  it("band(A,  1)",function() { assert( ndt.equal( band(A, 1), ndarray([4,8])  ))})
  it("band(A,  2)",function() { assert( ndt.equal( band(A, 2), ndarray([7])    ))})
  it("band(A,  3)",function() { assert( ndt.equal( band(A, 3), ndarray([])     ))})
  it("band(A,  4)",function() { assert( ndt.equal( band(A, 4), ndarray([])     ))})
})

describe( "2D (tall)", function() {

  beforeEach(function() {
    // [ 1, 2 ]
    // [ 3, 4 ]
    // [ 5, 6 ]
    // [ 7, 8 ]
    A = ndarray([1,2,3,4,5,6,7,8],[4,2])
  })

  it("band(A, -3)",function() { assert( ndt.equal( band(A,-3), ndarray([])    ))})
  it("band(A, -2)",function() { assert( ndt.equal( band(A,-2), ndarray([])    ))})
  it("band(A, -1)",function() { assert( ndt.equal( band(A,-1), ndarray([2])   ))})
  it("band(A,  0)",function() { assert( ndt.equal( band(A, 0), ndarray([1,4]) ))})
  it("band(A,  1)",function() { assert( ndt.equal( band(A, 1), ndarray([3,6]) ))})
  it("band(A,  2)",function() { assert( ndt.equal( band(A, 2), ndarray([5,8]) ))})
  it("band(A,  3)",function() { assert( ndt.equal( band(A, 3), ndarray([7])   ))})
  it("band(A,  4)",function() { assert( ndt.equal( band(A, 4), ndarray([])    ))})
  it("band(A,  5)",function() { assert( ndt.equal( band(A, 5), ndarray([])    ))})
})

describe( "2D (short)", function() {

  beforeEach(function() {
    // [ 1, 2, 3, 4 ]
    // [ 5, 6, 7, 8 ]
    A = ndarray([1,2,3,4,5,6,7,8],[2,4])
  })

  it("band(A, -5)",function() { assert( ndt.equal( band(A,-5), ndarray([])    ))})
  it("band(A, -4)",function() { assert( ndt.equal( band(A,-4), ndarray([])    ))})
  it("band(A, -3)",function() { assert( ndt.equal( band(A,-3), ndarray([4])   ))})
  it("band(A, -2)",function() { assert( ndt.equal( band(A,-2), ndarray([3,8]) ))})
  it("band(A, -1)",function() { assert( ndt.equal( band(A,-1), ndarray([2,7]) ))})
  it("band(A,  0)",function() { assert( ndt.equal( band(A, 0), ndarray([1,6]) ))})
  it("band(A,  1)",function() { assert( ndt.equal( band(A, 1), ndarray([5])   ))})
  it("band(A,  2)",function() { assert( ndt.equal( band(A, 2), ndarray([])    ))})
  it("band(A,  3)",function() { assert( ndt.equal( band(A, 3), ndarray([])    ))})
})
describe( "3D", function() {

  beforeEach(function() {
    // k = 0:
    // |---> i         ---
    // [  0,  8, 16 ]   |  j
    // [  4, 12, 20 ]   v
    //
    // k = 1:
    // [  1,  9, 17 ]
    // [  5, 13, 21 ]
    //
    // k = 2:
    // [  2, 10, 18 ]
    // [  6, 14, 22 ]
    //
    // k = 3:
    // [  3, 11, 19 ]
    // [  7, 15, 23 ]

    A = ndarray(iota(24),[3,2,4])
  })

  it("band(A, [0,0])",function() {
    assert( ndt.equal( band(A,[0,0]), ndarray([0,13])    ))
  })

  it("band(A, [-1,0])",function() {
    assert( ndt.equal( band(A,[-1,0]), ndarray([5])    ))
  })

  it("band(A, [1,0])",function() {
    assert( ndt.equal( band(A,[1,0]), ndarray([8,21])    ))
  })

  it("band(A, [0,1])",function() {
    assert( ndt.equal( band(A,[0,1]), ndarray([4])    ))
  })

  it("band(A, [1,1])",function() {
    assert( ndt.equal( band(A,[-1,-2]), ndarray([10,23])    ))
  })

})

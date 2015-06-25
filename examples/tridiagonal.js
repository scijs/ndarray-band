'use strict'

var pool = require('ndarray-scratch'),
    ops = require('ndarray-ops'),
    band = require('../lib'),
    show = require('ndarray-show')

var A = pool.zeros([10,10])

ops.assigns( band(A,-1),  1 )
ops.assigns( band(A, 0), -2 )
ops.assigns( band(A, 1),  1 )

console.log(show(A))

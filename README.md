# ndarray-band 

[![Build Status](https://travis-ci.org/scijs/ndarray-band.svg?branch=1.0.0)](https://travis-ci.org/scijs/ndarray-band) [![npm version](https://badge.fury.io/js/ndarray-band.svg)](http://badge.fury.io/js/ndarray-band)

Create a view of a band of an ndarray


## Introduction

First things first, if bands are meaningful in your matrix problem, there's a chance you should really just be dealing with the bands directly with algorithms designed to work with, for example, tridiagonal or Toeplitz matrices. But if you need a band, then this module provides a convenience function to extract a view of a band, i.e. a diagonal with an offset.

Given an ndarray of dimension `d`, then since the band is a one-dimensional array, only `d-1` offsets are necessary. Thus, the offsets are given for dimensions 1, 2, ..., d-1.


## Example

Consider constructing the 10 x 10 1-D discrete Laplacian operator. Of course in any realistic problem you'd obviously want to avoid constructing this at all costs, but there are cases where it's necessary or at least useful to refer to a band view.

```javascript
var pool = require('ndarray-scratch'),
    ops = require('ndarray-ops'),
    band = require('ndarray-band')

var A = pool.zeros([10,10])

ops.assigns( band(A,-1), -1 )  // (superdiagonal)
ops.assigns( band(A, 0), -2 )  // (diagonal)
ops.assigns( band(A, 1), -1 )  // (subdiagonal)

//        [ -2   -1    0    0    0    0    0    0    0    0 ]
//        [ -1   -2   -1    0    0    0    0    0    0    0 ]
//        [  0   -1   -2   -1    0    0    0    0    0    0 ]
//        [  0    0   -1   -2   -1    0    0    0    0    0 ]
//  A  =  [  0    0    0   -1   -2   -1    0    0    0    0 ]
//        [  0    0    0    0   -1   -2   -1    0    0    0 ]
//        [  0    0    0    0    0   -1   -2   -1    0    0 ]
//        [  0    0    0    0    0    0   -1   -2   -1    0 ]
//        [  0    0    0    0    0    0    0   -1   -2   -1 ]
//        [  0    0    0    0    0    0    0    0   -1   -2 ]
```


## Install

```sh
$ npm install ndarray-band
```


## API

### `require('ndarray-band')( A, offsets )`
Create a view of a band of an ndarray given offsets

* `A`: the ndarray of dimension `d` of which to create a view
* `offsets`: an array of length `d-1` containing the offset of the band along the corresponding dimension. For the special case `d = 1`, the band must equal the full vector so the offset is unused. For the special case `d = 2`, there is only one offset so a scalar is permitted in place of an array.

**Returns**: a 1-D ndarray starting at element 0 and of whatever length required such that the view will never contain an element outside the original ndarray.


## Credits

(c) 2015 . MIT License

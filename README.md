# ndarray-band

[![Build Status](https://travis-ci.org/scijs/ndarray-band.svg)](https://travis-ci.org/scijs/ndarray-band) [![npm version](https://badge.fury.io/js/ndarray-band.svg)](http://badge.fury.io/js/ndarray-band) [![Dependency Status](https://david-dm.org/scijs/ndarray-band.svg)](https://david-dm.org/scijs/ndarray-band)

Create a view of a band of an ndarray


## Introduction

First things first, if bands are meaningful in your matrix problem, there's a chance you should really just be dealing with the bands directly using algorithms designed to work with, for example, tridiagonal or Toeplitz matrices. But if you need a band, then this module provides a convenience function to extract a view of a band, i.e. a diagonal with an offset.

Note that for an ndarray of dimension <img alt="undefined" valign="middle" width="9.600000000000001" height="17.6" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/d-9f054caaf1.svg">, since the band is a one-dimensional array, only <img alt="undefined" valign="middle" width="41.6" height="19.200000000000003" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/d-1-bca766ea03.svg"> offsets are necessary. Thus, the offsets are given for dimensions <img alt="undefined" valign="middle" width="110.4" height="20.8" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/1-2-ldots-d-1-dbc79ca770.svg">.

Also note that for dimensions greater than two, this gets a little confusing. Here's a more precise specification that's not exactly less confusing, but at least it's precise: Given an array <img alt="undefined" valign="middle" width="12.8" height="17.6" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/a-0261024718.svg"> and offsets <img alt="undefined" valign="middle" width="49.6" height="20.8" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/mathrmoffset_1-b52ff5101d.svg">, <img alt="undefined" valign="middle" width="49.6" height="20.8" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/mathrmoffset_2-c05c6f4a0e.svg">, ..., <img alt="undefined" valign="middle" width="67.2" height="20.8" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/mathrmoffset_d-1-280b776e40.svg">, ndarray-band returns a view of <img alt="undefined" valign="middle" width="12.8" height="17.6" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/a-0261024718.svg"> at 

<p align="center"><img alt="undefined" valign="middle" width="513.6" height="33.6" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/amathrmoffset_1-i_1-i-mathrmoffset_2-i_1-i-ld-f1ddfa39c6.svg"></p>

 where <img alt="undefined" valign="middle" width="12.8" height="19.200000000000003" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/i_1-b3b94cea6b.svg"> is the the first element that falls within the bounds of <img alt="undefined" valign="middle" width="12.8" height="17.6" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/a-0261024718.svg"> and <img alt="undefined" valign="middle" width="4.800000000000001" height="16" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/i-7cfb28f31d.svg"> is the index of the view starting at zero. The length of the band will be such that it only ever contains element within the bounds of <img alt="undefined" valign="middle" width="12.8" height="17.6" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/a-0261024718.svg">.

To make that actually concrete, the bands of a <img alt="undefined" valign="middle" width="41.6" height="17.6" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/3-times-4-6045f82e09.svg"> tridiagonal matrix are indexed like:



<p align="center"><img alt="undefined" valign="middle" width="158.4" height="84.80000000000001" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/left-beginarraycccc-b_0-c_0-0-0-a_0-b_1-c_1-0-6f0390b691.svg"></p>



## Example

Consider constructing the <img alt="undefined" valign="middle" width="60.800000000000004" height="17.6" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/10-times-10-501f0916ae.svg"> 1-D discrete Laplacian operator. Of course in any realistic problem you'd obviously want to avoid constructing this at all costs, but there are cases where it's necessary or at least useful to refer to a band view.

```javascript
var pool = require('ndarray-scratch'),
    ops = require('ndarray-ops'),
    band = require('ndarray-band')

var A = pool.zeros([10,10])

ops.assigns( band(A,-1),  1 )  // (superdiagonal)
ops.assigns( band(A, 0), -2 )  // (diagonal)
ops.assigns( band(A, 1),  1 )  // (subdiagonal)

//        [ -2    1    0    0    0    0    0    0    0    0 ]
//        [  1   -2    1    0    0    0    0    0    0    0 ]
//        [  0    1   -2    1    0    0    0    0    0    0 ]
//        [  0    0    1   -2    1    0    0    0    0    0 ]
//  A  =  [  0    0    0    1   -2    1    0    0    0    0 ]
//        [  0    0    0    0    1   -2    1    0    0    0 ]
//        [  0    0    0    0    0    1   -2    1    0    0 ]
//        [  0    0    0    0    0    0    1   -2    1    0 ]
//        [  0    0    0    0    0    0    0    1   -2    1 ]
//        [  0    0    0    0    0    0    0    0    1   -2 ]
```


## Install

```sh
$ npm install ndarray-band
```


## API

### `require('ndarray-band')( A, offsets )`
Create a view of a band of an ndarray given offsets along the dimensions.

* `A`: the ndarray of dimension <img alt="undefined" valign="middle" width="9.600000000000001" height="17.6" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/d-9f054caaf1.svg"> of which to create a view
* `offsets`: an array of length <img alt="undefined" valign="middle" width="41.6" height="19.200000000000003" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/d-1-bca766ea03.svg"> containing the offset of the band along the respective dimensions. For the special case <img alt="undefined" valign="middle" width="43.2" height="17.6" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/d-1-e416488b55.svg">, the band is equal to the original vector so the offset is unused. For the special case <img alt="undefined" valign="middle" width="43.2" height="17.6" src="https://rawgit.com/scijs/ndarray-band/master/docs/images/d-2-a914c39653.svg">, there is only one offset so a scalar is permitted in place of an array.

**Returns**: a 1-D ndarray starting at element 0 and of whatever length required such that the view will never contain an element outside the original ndarray.


## Credits

(c) 2015 Ricky Reusser. MIT License
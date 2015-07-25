# ndarray-band

[![Build Status](https://travis-ci.org/scijs/ndarray-band.svg)](https://travis-ci.org/scijs/ndarray-band) [![npm version](https://badge.fury.io/js/ndarray-band.svg)](http://badge.fury.io/js/ndarray-band) [![Dependency Status](https://david-dm.org/scijs/ndarray-band.svg)](https://david-dm.org/scijs/ndarray-band)

Create a view of a band of an ndarray


## Introduction

First things first, if bands are meaningful in your matrix problem, there's a chance you should really just be dealing with the bands directly using algorithms designed to work with, for example, tridiagonal or Toeplitz matrices. But if you need a band, then this module provides a convenience function to extract a view of a band, i.e. a diagonal with an offset.

Note that for an ndarray of dimension <img alt="d" valign="middle" width="14.5" height="20" src="docs/images/d-16937d4263.png">, since the band is a one-dimensional array, only <img alt="d-1" valign="middle" width="49" height="22" src="docs/images/d-1-0b692e3677.png"> offsets are necessary. Thus, the offsets are given for dimensions <img alt="1&comma; 2&comma; &bsol;ldots&comma; d-1" valign="middle" width="122" height="24" src="docs/images/1-2-ldots-d-1-22dde7ff62.png">.

Also note that for dimensions greater than two, this gets a little confusing. Here's a more precise specification that's not exactly less confusing, but at least it's precise: Given an array <img alt="A" valign="middle" width="19" height="20" src="docs/images/a-ab9f9c6779.png"> and offsets <img alt="&bsol;mathrm&lcub;offset&rcub;&lowbar;1" valign="middle" width="59" height="23" src="docs/images/mathrmoffset_1-b161aee517.png">, <img alt="&bsol;mathrm&lcub;offset&rcub;&lowbar;2" valign="middle" width="59" height="23" src="docs/images/mathrmoffset_2-bb6efbd13a.png">, ..., <img alt="&bsol;mathrm&lcub;offset&rcub;&lowbar;&lcub;d-1&rcub;" valign="middle" width="80" height="25" src="docs/images/mathrmoffset_d-1-7d7845f591.png">, ndarray-band returns a view of <img alt="A" valign="middle" width="19" height="20" src="docs/images/a-ab9f9c6779.png"> at 

<p align="center"><img alt="A&lpar;&bsol;mathrm&lcub;offset&rcub;&lowbar;1 &plus; i&lowbar;1 &plus; i&comma; &bsol;mathrm&lcub;offset&rcub;&lowbar;2 &plus; i&lowbar;1 &plus; i&comma;&bsol;&semi; &bsol;ldots&comma;&bsol;&semi;&bsol;mathrm&lcub;offset&rcub;&lowbar;&lcub;d-1&rcub; &plus; i&lowbar;1 &plus; i&comma; i&lowbar;1 &plus; i&rpar;" valign="middle" width="554.5" height="49" src="docs/images/amathrmoffset_1-i_1-i-mathrmoffset_2-i_1-i-ld-c37a4e01e5.png"></p>

 where <img alt="i&lowbar;1" valign="middle" width="20" height="23" src="docs/images/i_1-b3e00247b1.png"> is the the first element that falls within the bounds of <img alt="A" valign="middle" width="19" height="20" src="docs/images/a-ab9f9c6779.png"> and <img alt="i" valign="middle" width="11" height="20" src="docs/images/i-7e6a3286a9.png"> is the index of the view starting at zero. The length of the band will be such that it only ever contains element within the bounds of <img alt="A" valign="middle" width="19" height="20" src="docs/images/a-ab9f9c6779.png">.

To make that actually concrete, the bands of a <img alt="3 &bsol;times 4" valign="middle" width="48.5" height="22" src="docs/images/3-times-4-9908d9131f.png"> tridiagonal matrix are indexed like:



<p align="center"><img alt="&bsol;left&lsqb; &bsol;begin&lcub;array&rcub;&lcub;cccc&rcub;&NewLine;c&lowbar;0 &amp; d&lowbar;0 &amp; e&lowbar;0 &amp; f&lowbar;0 &bsol;&bsol;&NewLine;b&lowbar;0 &amp; c&lowbar;1 &amp; d&lowbar;1 &amp; e&lowbar;1 &bsol;&bsol;&NewLine;a&lowbar;0 &amp; b&lowbar;1 &amp; c&lowbar;2 &amp; d&lowbar;2&NewLine;&bsol;end&lcub;array&rcub;&bsol;right&rsqb;" valign="middle" width="188" height="94" src="docs/images/left-beginarraycccc-c_0-d_0-e_0-f_0-b_0-c_1-d-0158dede7b.png"></p>



## Example

Consider constructing the <img alt="10 &bsol;times 10" valign="middle" width="68.5" height="22" src="docs/images/10-times-10-c93cbd0678.png"> 1-D discrete Laplacian operator. Of course in any realistic problem you'd obviously want to avoid constructing this at all costs, but there are cases where it's necessary or at least useful to refer to a band view.

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

* `A`: the ndarray of dimension <img alt="d" valign="middle" width="14.5" height="20" src="docs/images/d-16937d4263.png"> of which to create a view
* `offsets`: an array of length <img alt="d-1" valign="middle" width="49" height="22" src="docs/images/d-1-0b692e3677.png"> containing the offset of the band along the respective dimensions. For the special case <img alt="d &equals; 1" valign="middle" width="51" height="20" src="docs/images/d-1-7ad594a652.png">, the band is equal to the original vector so the offset is unused. For the special case <img alt="d &equals; 2" valign="middle" width="51" height="20" src="docs/images/d-2-557127d7f6.png">, there is only one offset so a scalar is permitted in place of an array.

**Returns**: a 1-D ndarray starting at element 0 and of whatever length required such that the view will never contain an element outside the original ndarray.


## Credits

(c) 2015 Ricky Reusser. MIT License
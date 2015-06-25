'use strict'

var ndarray = require('ndarray')

module.exports = pickBand

function pickBand(M, iband) {
  var i, nshape, nstride, mshape, mstride, noffset, i1, i2
  var d = M.dimension

  if(d <= 1) {
    return M
  }

  if( !isNaN(parseFloat(iband)) && isFinite(iband) ) {
    iband = [iband]
  }

  nshape  = (1<<30)
  nstride = 0
  mshape  = M.shape
  mstride = M.stride
  noffset = M.offset

  // Clip the starting and ending indices in each dimension,
  // then take the difference to get the final length:
  i1 = 0
  i2 = mshape[d-1]

  for(i=0; i<d-1; i++) {
    i1 = Math.max(i1, -iband[i])
    i2 = Math.min(i2, mshape[i] - iband[i])
  }

  // Calculate the shape based on the calculated index bounds:
  nshape = Math.max(0,i2-i1)

  // Update the stride to traverse the diagonal:
  for(i=0; i<d; ++i) {
    nstride += mstride[i]
  }

  // Calculate the new offset
  for(i=0; i<d-1; i++) {
    noffset += (iband[i]+i1) * mstride[i]
  }
  noffset += i1 * mstride[d-1]

  return ndarray(M.data, [nshape], [nstride], noffset)
}

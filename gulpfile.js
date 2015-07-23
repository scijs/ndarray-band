'use strict'

var gulp = require('gulp')
  , eqSub = require('gulp-markdown-equations')
  , tap = require('gulp-tap')
  , filter = require('gulp-filter')
  , latex = require('gulp-latex')
  , pdftocairo = require('gulp-pdftocairo')
  , path = require('path')

function giturl(rel) {
  return 'https://rawgit.com/rreusser/gulp-markdown-equations/master/' + rel
  //return 'https://cdn.rawgit.com/rreusser/gulp-markdown-equations/master/' + rel
  //return rel
}

gulp.task('mdtex',function() {

  var texFilter = filter('*.tex')
  var mdFilter = filter('*.md')
  var sub = eqSub({
    defaults: {
      display: { margin: '1pt 5pt', fontSize: '12pt' },
      inline: { margin: '0 2pt 0pt 1pt', fontSize: '12pt' }
    }
  })

  return gulp.src('*.mdtex')
    .pipe(sub)

    .pipe(texFilter)
    .pipe(latex())
    .pipe(pdftocairo({format: 'svg'}))
    .pipe(gulp.dest('docs/images'))
    .pipe(tap(function(file) {
      sub.completeSync(file,function(cb) {
        var img = '<img alt="'+this.alt+'" valign="middle" width="' + this.width*1.6 + '" height="' + this.height*1.6 + '" src="'+giturl(this.path)+'">'
        return this.display ? '\n\n<p align="center">'+img+'</p>\n\n' : img
      })
    }))
    .pipe(texFilter.restore())

    .pipe(mdFilter)
    .pipe(gulp.dest('./'))
    .pipe(mdFilter.restore())

})

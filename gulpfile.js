'use strict'

var gulp = require('gulp');

var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var bases = {
 app: 'src/',
 dist: 'dist/',
};

var paths = {
 scripts: ['**/*.js']
};

// Delete the dist directory
gulp.task('clean', function() {
 return gulp.src(bases.dist)
 .pipe(clean());
});

// Process scripts and concatenate them into one output file
gulp.task('scripts', ['clean'], function() {
 gulp.src(paths.scripts, {cwd: bases.app})
 .pipe(jshint())
 .pipe(jshint.reporter('default'))
 .pipe(uglify())
 .pipe(concat('angular-gridstack.min.js'))
 .pipe(gulp.dest(bases.dist));
});

// Define the default task as a sequence of the above tasks
gulp.task('default', ['clean', 'scripts']);
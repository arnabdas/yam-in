var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  handlebars = require('gulp-handlebars'),
  wrap = require('gulp-wrap'),
  declare = require('gulp-declare'),
  concat = require('gulp-concat'),
  minify_css = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  manifest = require('./app/manifest.json'),
  project = require('./package.json'),
  crx = require('gulp-crx-pack'),
  fs = require('fs'),
  zip = require('gulp-zip'),
  del = require('del');

var paths = {
  'swarm:js:src': ['app/js/namespace.js', 'app/js/**/*.js'],
  'swarm:templates:src': ['app/templates/*.hbs'],
  'swarm:css:src': ['app/css/feeds.css', 'app/css/profile.css', 'app/css/overrides.css', 'app/css/loading.css', 'app/css/templates.css'],
  'swarm:plugin:src': ['app/img/**/*', 'app/libs/css/**/*', 'app/libs/js/**/*', 'app/oauth2/**/*', 'app/background.js', 'app/popup.js', 'app/manifest.json', 'app/home.html'],
  'swarm:plugin:build': ['build'],
  'swarm:plugin:dist': 'dist/' + manifest.name+'-'+manifest.version
};

var options = {
  'declare:templates': {
    namespace: 'Swarm.templates',
    noRedeclare: true
  }
};

gulp.task('move:fonts', function () {
  gulp.src(['app/libs/fonts/**/*'], { base: 'app/libs' })
    .pipe(gulp.dest('build'));
});

gulp.task('build:js', function () {
  return gulp.src(paths['swarm:js:src'])
    .pipe(concat('swarm.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(concat('swarm.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('build:css', ['move:fonts'], function () {
  return gulp.src(paths['swarm:css:src'])
    .pipe(concat('swarm.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(minify_css())
    .pipe(concat('swarm.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('build:src', ['build:js', 'build:css'], function(){
  gulp.src(paths['swarm:plugin:src'], { base: './app' })
    .pipe(gulp.dest('build'));
});

gulp.task('build:templates', function () {
  gulp.src(paths['swarm:templates:src'])
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare(options['declare:templates']))
    .pipe(concat('swarm.templates.js'))
    .pipe(gulp.dest('build/js'));/*
    .pipe(uglify('swarm.templates.min.js'))
    .pipe(gulp.dest('build/js'));*/
});

gulp.task('watch:src', function () {
  gulp.watch(paths['swarm:js:src'].concat(paths['swarm:css:src'])
    , ['build:src']);
});

gulp.task('watch:templates', function () {
  gulp.watch(paths['swarm:templates:src'], ['build:templates']);
});

gulp.task('move:plugin:src', function () {
  return gulp.src(paths['swarm:plugin:src'], { base: './app' })
    .pipe(gulp.dest(paths['swarm:plugin:dist']));
});

gulp.task('create:dist', ['build:src', 'build:templates', 'move:plugin:src'], function(){
  return gulp.src(['build/js/*min.js','build/css/*min.css', 'build/fonts/*', 'build/js/*.templates.js'], { base: './build' })
    .pipe(gulp.dest(paths['swarm:plugin:dist']));
});

gulp.task('create:zip', ['create:dist'], function () {
  return gulp.src(paths['swarm:plugin:dist']+'/**/*')
    .pipe(zip(manifest.name+'-'+manifest.version + ".zip"))
    .pipe(gulp.dest('dist'));
})

/*gulp.task('create:crx', ['create:dist'], function() {
  return gulp.src(paths['swarm:plugin:dist'])
    .pipe(crx({
      privateKey: fs.readFileSync('./dist.pem', 'utf8'),
      filename: manifest.name + '-' + manifest.version + '.crx',
      codebase: '.',
      updateXmlFilename: 'update.xml'
    }))
    .pipe(gulp.dest('./releases'));
});*/

gulp.task('release', ['create:zip']);

gulp.task('default', ['build:src', 'build:templates', 'watch:src', 'watch:templates']);

gulp.task('clean', function(){
  return del(['build/**', 'dist/**']);
});

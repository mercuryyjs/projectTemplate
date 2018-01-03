// generated on 2018-01-02 using generator-webapp 2.2.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
// const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', function () {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

/*function lint (files, options) {
 return gulp.src(files)
 .pipe(reload({stream: true, once: true}))
 .pipe($.eslint(options))
 .pipe($.eslint.format())
 .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
 }*/

/*gulp.task('lint', function() {
 return lint('app/scripts/!**!/!*.js', {
 fix: true
 })
 .pipe(gulp.dest('app/scripts'));
 });*/

/*gulp.task('lint:test', function() {
 return lint('test/spec/!**!/!*.js', {
 fix: true,
 env: {
 mocha: true
 }
 })
 .pipe(gulp.dest('test/spec'));
 });*/
var htmlOptions = {
  removeComments: true,//清除HTML注释
  collapseWhitespace: true,//压缩HTML
  collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
  removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
  removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
  removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
  minifyJS: true,//压缩页面JS
  minifyCSS: true//压缩页面CSS
};

gulp.task('html', ['styles', 'scripts'], function () {
  return gulp.src('app/manage/modules/**/*.html')
    .pipe($.if('*.html', $.htmlmin(htmlOptions)))
    .pipe($.replace(/\.\.\/assets\//g, ''))
    .pipe(gulp.dest('dist/manage/modules'));
});

gulp.task('extras', function () {
  gulp.src('app/manage/*.html')
    .pipe($.useref())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.replace(/\.\.\/assets\//g, ''))
    .pipe(gulp.dest('dist/manage'));
});

gulp.task('images', function () {
  return gulp.src('app/assets/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/manage/images'));
});

gulp.task('fonts', function () {
  return gulp.src('app/assets/fonts/*.*', function (err) {})
    .pipe(gulp.dest('dist/manage/fonts'));
});

gulp.task('jsPlugins', function () {
  return gulp.src('app/assets/scripts/**/*.*')
    .pipe(gulp.dest('dist/manage/scripts'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

/*gulp.task('serve', function () {
 runSequence(['clean', 'wiredep'], ['styles', 'scripts', 'fonts'], function () {
 browserSync({
 notify: false,
 port: 9000,
 server: {
 baseDir: ['.tmp', 'app'],
 routes: {
 '/bower_components': 'bower_components'
 }
 }
 });

 gulp.watch([
 'app/!*.html',
 'app/images/!**!/!*',
 '.tmp/fonts/!**!/!*'
 ]).on('change', reload);

 gulp.watch('app/styles/!**!/!*.scss', ['styles']);
 gulp.watch('app/scripts/!**!/!*.js', ['scripts']);
 gulp.watch('app/fonts/!**!/!*', ['fonts']);
 gulp.watch('bower.json', ['wiredep', 'fonts']);
 });
 });*/

/* gulp.task('serve:dist', function() {
 browserSync({
 notify: false,
 port: 9000,
 server: {
 baseDir: ['dist']
 }
 });
 }); */

/* gulp.task('serve:test', ['scripts'], function() {
 browserSync({
 notify: false,
 port: 9000,
 ui: false,
 server: {
 baseDir: 'test',
 routes: {
 '/scripts': '.tmp/scripts',
 '/bower_components': 'bower_components'
 }
 }
 });

 gulp.watch('app/scripts/!**!/!*.js', ['scripts']);
 gulp.watch(['test/spec/!**!/!*.js', 'test/index.html']).on('change', reload);
 gulp.watch('test/spec/!**!/!*.js', ['lint:test']);
 }); */

// inject bower components
/* gulp.task('wiredep', function() {
 gulp.src('app/styles/!*.scss')
 .pipe(wiredep({
 ignorePath: /^(\.\.\/)+/
 }))
 .pipe(gulp.dest('app/styles')); */

/* gulp.src('app/!*.html')
 .pipe(wiredep({
 exclude: ['bootstrap-sass'],
 ignorePath: /^(\.\.\/)*\.\./
 }))
 .pipe(gulp.dest('app'));
 }); */

gulp.task('build', ['html', 'images', 'jsPlugins', 'fonts', 'extras'], function () {
  // return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', function () {
  runSequence(['clean'], 'build'
  );
});

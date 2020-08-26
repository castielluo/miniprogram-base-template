const gulp = require('gulp')
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const jsonminify = require('gulp-jsonminify2')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require("gulp-rename")
const minifycss = require('gulp-minify-css')
const { series } = require('gulp')



gulp.task('clean', () => {
  return del(['./dist/**'])
})

gulp.task('watch', () => {
  gulp.watch(['./**/*.json', '!./node_modules/**', '!./dist/**'], gulp.series('json'));
  gulp.watch(['./assets/**', '!./node_modules/**', '!./dist/**'], gulp.series('assets'));
  gulp.watch(['./**/*.wxml', '!./node_modules/**', '!./dist/**'], gulp.series('templates'));
  gulp.watch(['./**/*.wxss', '!./node_modules/**', '!./dist/**'], gulp.series('wxss'));
  gulp.watch(['./**/*.sass', '!./node_modules/**', '!./dist/**'], gulp.series('wxss'));
  gulp.watch(['./**/*.scss', '!./node_modules/**', '!./dist/**'], gulp.series('wxss'));
  gulp.watch(['./**/*.js', '!./node_modules/**', '!./dist/**'], gulp.series('scripts'));
});



gulp.task('json', () => {
  return gulp.src(['./**/*.json', '!./node_modules/**'])
    .pipe(gulp.dest('./dist'))
})

gulp.task('jsonPro', () => {
  return gulp.src(['./**/*.json', '!./node_modules/**'])
    .pipe(jsonminify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('assets', () => {
  return gulp.src('./assets/**')
    .pipe(gulp.dest('./dist/assets'))
})

gulp.task('templates', () => {
  return gulp.src('./**/*.wxml')
    .pipe(gulp.dest('./dist'))
})

gulp.task('templatesPro', () => {
  return gulp.src(['./**/*.wxml', '!./node_modules/**'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      keepClosingSlash: true
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('wxss', () => {
  return gulp.src(['./**/*.{wxss,scss,sass}', '!./styles/**', '!./node_modules/**']).pipe(sass()).pipe(autoprefixer(['iOS >= 8','Android >= 4.1'])).pipe(rename((path) => path.extname = '.wxss')).pipe(gulp.dest('./dist'))
});

gulp.task('wxssPro', () => {
  return gulp.src(['./**/*.{wxss,scss,sass}', '!./styles/**', '!./node_modules/**']).pipe(sass()).pipe(autoprefixer(['iOS >= 8','Android >= 4.1'])).pipe(minifycss()).pipe(rename((path) => path.extname = '.wxss')).pipe(gulp.dest('./dist'))
});

gulp.task('scripts', () => {
  return gulp.src(['./**/*.js', '!./node_modules/**'])
  .pipe(babel({presets: ['@babel/preset-env']}))
    .pipe(gulp.dest('./dist'))
})

gulp.task('scriptsPro', () => {
  return gulp.src(['./**/*.js', '!./node_modules/**'])
    .pipe(babel({presets: ['@babel/preset-env']}))
    .pipe(uglify({
      compress: true,
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('dev', gulp.series(['clean'],gulp.parallel('json',
    'assets',
    'templates',
    // 'sass',
    'wxss',
    'scripts',
    'watch')),function () {})

gulp.task('build', gulp.series([
  'jsonPro',
  'assets',
  'templatesPro',
  'wxssPro',
  'scriptsPro'
]));

const pro = series('clean', 'build')
gulp.task('pro', gulp.series(['clean', 'build'], (done) => {
  done()
}))
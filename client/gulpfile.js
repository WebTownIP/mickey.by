var gulp = require("gulp")
var jade = require("gulp-jade")
var concat = require("gulp-continuous-concat")
var csso = require("gulp-csso")
var rename = require("gulp-rename")
var uglify = require("gulp-uglify")
var sass = require('gulp-sass')
var watch = require('gulp-watch')

gulp.task("concat-js", function(){
  var scripts = ["./app/**/*.module.js", "./app/**/*.js"]
  return gulp.src(scripts)
    .pipe(watch(scripts))
    .pipe(concat("index.js"))
    .pipe(gulp.dest("../static/client/app"))
    .pipe(rename("index.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("../static/client/app")) 
})

gulp.task("compile-jade", function(){
  var jades = "./app/**/*.jade"
  return gulp.src(jades)
    .pipe(watch(jades))
    .pipe(jade({
      pretty:true
    }))
    .on("error", console.log)
    .pipe(gulp.dest("../static/client/assets/views"))
})

gulp.task("compile-index", function(){
  var index = "./index.jade"
  return gulp.src(index)
    .pipe(watch(index))
    .pipe(jade({
      pretty:true
    }))
    .on("error", console.log)
    .pipe(gulp.dest("../static/client"))
})

gulp.task("compile-sass", function(){
  var styles = "./assets/sass/**/*.sass"
  return gulp.src(styles)
    .pipe(watch(styles))
    .pipe(sass())
    .pipe(concat("index.css"))
    .pipe(gulp.dest("./build/assets/css"))
    .pipe(rename("index.min.css"))
    .pipe(csso())
    .pipe(gulp.dest("../static/client/assets/css"))
})

gulp.task("copy-libs", function(){
  var libs = "./assets/libs/**/*"
  return gulp.src(libs)
    .pipe(watch(libs))
    .pipe(gulp.dest("../static/client/assets/libs"))
})

gulp.task("copy-images", function(){
  var images = "./assets/images/**/*"
  return gulp.src(images)
    .pipe(watch(images))
    .pipe(gulp.dest("../static/client/assets/images"))
})

gulp.task("default", ["concat-js", "compile-jade", "compile-sass",
  "copy-libs", "copy-images", "compile-index"])

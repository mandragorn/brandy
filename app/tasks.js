var gulp = require('gulp'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass');

var project_id, brand;

gulp.task('copy-default', function() {
  return gulp.src('./projects/' + project_id + '-src/**/*')
    .pipe(gulp.dest('./projects/' + project_id + '/'));
});

gulp.task('replace-html', function() {
  // Copy image files
  gulp.src('./uploads/**/*')
    .pipe(gulp.dest('./projects/' + project_id + '/_brandy'))

  var elements = brand.vars.html;

  return gulp.src('./projects/' + project_id + '-src/**/*.html')
    .pipe(cheerio({
      run: function($) {
        for (var element_id in elements) {
          var element = elements[element_id];

          $('[data-brandy-id="' + element_id + '"]').each(function() {
            for (var attr in element) {
              console.log("Changing %s's '%s' attribute from '%s' to '%s'", element_id, attr, $(this).attr(attr), element[attr])

              if (attr === 'text') {
                $(this).text(element[attr]);
              } else if (attr === 'src') {
                $(this).attr('src', '/_brandy/' + element[attr]);
              } else {
                $(this).attr(attr, element[attr]);
              }
            }
          });
        }
      }
    }))
    .pipe(gulp.dest('./projects/' + project_id + '/'));
});

gulp.task('replace-sass', function() {
  var vars = brand.vars.sass;

  return gulp.src('./projects/' + project_id + '-src/scss/**/*.scss')
    .pipe(replace(/\$(.*):(.*);/g, function(match, key, val) {
      // console.log(match)
      if (vars[key]) {
        console.log('Replacing %s with %s', match, '$' + key + ': ' + vars[key] + ';')
        return '$' + key + ': ' + vars[key] + ';';
      } else {
        return match;
      }
    }))
    .pipe(gulp.dest('./.tmp/' + project_id + '/sass/'))
});

gulp.task('run-sass', function() {
  console.log('Compiling Sass')

  return gulp.src('./.tmp/' + project_id + '/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./projects/' + project_id + '/stylesheets/'))
});

module.exports = function(_project_id, _brand, cb) {
  project_id = _project_id;

  if (_brand === 'default') {
    runSequence('copy-default', cb);
  } else {
    brand = _brand;
    runSequence(['replace-html', 'replace-sass'], 'run-sass', cb);
  }
};

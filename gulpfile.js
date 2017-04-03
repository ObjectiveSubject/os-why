
// Packages

var gulp        	= require('gulp'),
	babel 			= require('gulp-babel'),
	cleanCSS    	= require('gulp-clean-css'),
	concat			= require('gulp-concat'),
	imagemin		= require('gulp-imagemin'),
	imageResize 	= require('gulp-image-resize'),
	sourcemaps      = require('gulp-sourcemaps'),
	notify          = require('gulp-notify'),
	rename          = require('gulp-rename'),
	sass            = require('gulp-ruby-sass'),
	uglify			= require('gulp-uglify'),
	pngquant		= require('imagemin-pngquant'),
	unretina 		= require('gulp-unretina'),
	parallel 		= require("concurrent-transform"),
	webp			= require("gulp-webp"),
	os 				= require("os"),
	livereload      = require('gulp-livereload'),
	http            = require('http'),
	st              = require('st');

// Paths

var path = {
	scripts: {
		src: ['src/js/vendor/*.js', 'src/js/src/*.js'],
		watch: 'src/js/**/*.js',
		dest: 'build/js'
	},
	sass: {
		src: 'src/sass/app.scss',
		watch: 'src/sass/**/*.scss',
		dest: 'build/css'
	},
	img: {
		src: 'src/img/*@2x.{jpg,png}',
		dest: 'build/img'
	}
};

// Options

var options = {
	sass: { 
		sass: { style: 'expanded', sourcemap: true },
		rename: { suffix: '.min' }
	},
	images: {
		minify: { progressive: true, use: [ pngquant() ] }
	},
	livereload: { 
		basePath: 'build' 
	},
	server: {
		st: { 
			path: __dirname + '/', 
			index: 'index.html', 
			cache: false 
		},
		port: 8080
	}
};

gulp.task('scripts', () => {
	gulp.src( path.scripts.src )
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(livereload());
});

gulp.task( 'imagemin', function() {
	return gulp.src( path.img.src )
		.pipe( parallel(
			imagemin( options.images.minify ),
			os.cpus().length
		) )
		.pipe( gulp.dest( path.img.dest ) );
});

gulp.task("unretina", function () {
  gulp.src( path.img.dest + "/*@2x.{jpg,png,webp}")
    .pipe(parallel(
      unretina(),
      os.cpus().length
    ))
    .pipe(gulp.dest( path.img.dest ));
});

gulp.task( 'webp', function() {
	return gulp.src( path.img.dest )
		.pipe( webp() )
		.pipe( gulp.dest( './' ) );
});

gulp.task( 'sass', function() {
	return sass( path.sass.src, options.sass )
		.on( 'error', sass.logError )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( path.sass.dest ) )
		.pipe( rename( options.sass.rename ) )
		.pipe( cleanCSS() )
		.pipe( gulp.dest( path.sass.dest ) )
		.pipe( livereload() );
		// .pipe( notify( { message: 'sass task complete' } ) );
});

gulp.task( 'html', function(){
	gulp.src('index.html')
		.pipe(livereload());
});

gulp.task( 'watch', ['server'], function() {
  livereload.listen( options.livereload );
  gulp.watch( path.sass.watch, ['sass'] );
  gulp.watch( path.scripts.watch, ['scripts'] );
  gulp.watch( 'index.html', ['html'] );
});

gulp.task( 'server', function( done ) {
  http.createServer(
    st( options.server.st )
  ).listen( options.server.port, done );
});

gulp.task( 'build', [ 'scripts', 'sass', 'imagemin', 'unretina' ] );

gulp.task( 'default', ['scripts', 'sass', 'watch'] );

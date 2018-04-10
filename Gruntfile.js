'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  // grunt.loadNpmTasks('grunt-contrib-less');
  grunt.initConfig({
    less: {
      style: {
        files: {
          'build/css/style.css': ['less/style.less']
        }
      }
    },

    postcss: {
      options: {
        processors: [
            require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      dist: {
        src: 'build/css/*.css'
      }
    },

    watch: {
      // html: {
      //   files: ['*.html'],
      //   tasks: ['posthtml']
      // },
      style: {
        files: ['less/**/*.less'],
        tasks: ['less', 'postcss', 'csso']
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: ['build/*.html', 'build/css/*.css', 'build/js/*.js', 'build/img/*.svg']
        },
        options: {
          server: './build/',
          watchTask: true,
          notify: false,
          open: false
        }
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["img/**/*.{png,jpg,svg}"]
        }]
      }
    },

    cwebp: {
      images: {
        options: {
          q: 90
        },
        files: [{
          expand: true,
          src: ["img/**/*.{png,jpg}"]
        }]
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false,
      },
      sprite: {
        files: {
          "build/img/sprite.svg": ["img/icon-*.svg"]
        }
      }
    },

    posthtml: {
      options: {
        use: [
          require("posthtml-include")()
        ]
      },
      html: {
        files: [{
          expand: true,
          src: ["*.html"],
          dest: "build"
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            'fonts/**/*.{woff, woff2}',
            'img/**',
            'js/**',
            '*.html'
          ],
          dest: 'build'
        }]
      }
    },

    clean: {
      build: ['build']
    }
  });

  grunt.registerTask('serve', ['browserSync', 'watch']);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'less',
    'postcss',
    'csso',
    // 'svgstore',
    // 'posthtml'
  ]);
};

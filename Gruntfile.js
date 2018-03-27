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

    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            'build/fonts/**/*.{woff, woff2}',
            'build/img/**',
            'build/js/**',
            'build/*.html' // <<<<<<<<<<<<<<<delete
          ],
          dest: 'build'
        }]
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require('autoprefixer')()
          ]
        },
        scr: 'build/css/*.css'
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: ['build/*.html', 'build/css/*.css']
        },
        options: {
          server: 'build/',
          watchTask: true,
          notify: false,
          open: false
        }
      },
      // browser: 'google chrome'
      // '/mnt/c/Program\ Files\ \(x86\)/Google/Chrome/Application/chrome.exe http://localhost:3000'
    },

    watch: {
      // html: {
      //   files: ['*.html'],
      //   tasks: ['posthtml']
      // },
      style: {
        files: ['less/**/*.less'],
        tasks: ['less', 'postcss'] // , 'csso'
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
    // 'csso',
    // 'svgstore',
    // 'posthtml'
  ]);
};

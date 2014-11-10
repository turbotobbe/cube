'use strict';

//  function stripVersion(dest, src) {
//    return dest + src.replace(/-[0-9]+\.[0-9]+\.[0-9]+/, '');
//  };

module.exports = function (grunt) {

  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mainName: '<%= pkg.name %>-<%= pkg.version %>',
    demoName: '<%= pkg.name %>-demo-<%= pkg.version %>',
    clean: {
      demo: {
        src: 'target'
      }
    },
    concat: {
      main: {
        src: ['src/main/js/cube.js', 'src/main/js/cube-vector.js', 'src/main/js/cube-*.js'],
        dest: 'target/main/js/<%= mainName %>.js'
      },
      demo: {
        src: ['src/demo/js/demo.js', 'src/demo/js/demo-*.js'],
        dest: 'target/demo/js/<%= demoName %>.js'
      }
    },
    uglify: {
      main: {
        options: {
          banner: '/*! <%= mainName %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'target/main/js/<%= mainName %>.min.js': ['<%= concat.main.dest %>']
        }
      },
      demo: {
        options: {
          banner: '/*! <%= demoName %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'target/demo/js/<%= demoName %>.min.js': ['<%= concat.demo.dest %>']
        }
      }
    },
    less: {
      demo: {
        files: {
          "target/demo/css/<%= demoName %>.css": "src/demo/css/*.less"
        }
      }
    },
    copy: {
      demo: {
        files: [
        {
          expand: true,
          cwd: 'src/demo/',
          src: ['**.html'],
          dest: 'target/demo/'
        },
        {
          expand: true,
          cwd: 'target/main/js/',
          src: ['<%= mainName %>.js'],
          dest: 'target/demo/js/'
        },
        ]
      },
      dist: {
        expand: true,
        src: ['target/<%= mainName %>.js', 'target/<%= mainName %>.min.js'],
        dest: 'dist/',
        flatten: true
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      main: {
        src: ['src/main/js/**.js']
      },
      demo: {
        src: ['src/demo/js/**.js']
      },
      test: {
        src: ['src/test/js/**.js']
      }
    },
    nodeunit: {
      files: ['src/test/js/**.js']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      main: {
        files: 'src/main/**',
        tasks: ['main']
      },
      demo: {
        files: 'src/demo/**',
        tasks: ['demo']
      }
    }
  });

  grunt.registerTask('default', ['main', 'nodeunit', 'demo']);

  grunt.registerTask('main', ['jshint:main', 'concat:main', 'uglify:main']);
  grunt.registerTask('demo', ['jshint:demo', 'concat:demo', 'uglify:demo', 'less:demo', 'copy:demo']);
  grunt.registerTask('release', ['clean', 'main', 'copy:dist']);

};
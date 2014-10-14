module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/cube*.js'],
        dest: 'build/<%= pkg.name %>-<%= pkg.version %>.js',
      },
      demo: {
        src: ['src/demo*.js'],
        dest: 'build/<%= pkg.name %>-<%= pkg.version %>-demo.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: 'build/<%= pkg.name %>-<%= pkg.version %>.js',
        dest: 'build/<%= pkg.name %>-<%= pkg.version %>.min.js'
      },
      demo: {
        src: 'build/<%= pkg.name %>-<%= pkg.version %>-demo.js',
        dest: 'build/<%= pkg.name %>-<%= pkg.version %>-demo.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);
}
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        rel: {
            name:'<%= pkg.name %>-<%= pkg.version %>'
        },
        concat: {
            pack: {
                src: ['src/cube.js', 'src/cube-*.js'],
                dest: 'build/<%= rel.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= rel.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: 'build/<%= rel.name %>.js',
                dest: 'build/<%= rel.name %>.min.js'
            }
        },
        copy: {
            demo: {
                src: 'build/<%= rel.name %>.min.js',
                dest: 'demo/js/<%= rel.name %>.min.js'
            }
        },
        yuidoc: {
            compile: {
                name: '<%= rel.name %>.js Physics Engine API Documentation',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths : 'src',
                    outdir: 'doc',
                    linkNatives: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    grunt.registerTask('default', ['concat', 'uglify', 'copy', 'yuidoc']);
}
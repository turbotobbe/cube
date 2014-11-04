module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        rel: {
            name: '<%= pkg.name %>-<%= pkg.version %>'
        },
        clean: {
            src: ['target', 'demo/js/<%= rel.name %>.min.js', 'demo/js/<%= rel.name %>-demo.min.js']
        },
        concat: {
            main: {
                src: ['src/main/cube.js', 'src/main/cube-vector.js', 'src/main/cube-*.js'],
                dest: 'target/<%= rel.name %>.js'
            },
            demo: {
                src: ['src/demo/demo.js', 'src/demo/demo-*.js'],
                dest: 'target/<%= rel.name %>-demo.js'
            }
        },
        uglify: {
            main: {
                options: {
                    banner: '/*! <%= rel.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'target/<%= rel.name %>.min.js': ['<%= concat.main.dest %>']
                }
            },
            demo: {
                options: {
                    banner: '/*! <%= rel.name %>-demo <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'target/<%= rel.name %>-demo.min.js': ['<%= concat.demo.dest %>']
                }
            }
        },
        copy: {
            main: {
                src: 'target/<%= rel.name %>.js',
                dest: 'demo/js/<%= rel.name %>.js'
            },
            demo: {
                src: 'target/<%= rel.name %>-demo.js',
                dest: 'demo/js/<%= rel.name %>-demo.js'
            },
            dist: {
                expand: true,
                cwd: 'target/',
                src: ['<%= rel.name %>.js', '<%= rel.name %>.min.js'],
                dest: 'dist/',
                flatten: true,
                filter: 'isFile',
            }
        },
        nodeunit: {
            main: ['src/test/test-*.js']
        },
        yuidoc: {
            compile: {
                name: '<%= rel.name %>.js Physics Engine API Documentation',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'src/main',
                    outdir: 'target/doc',
                    linkNatives: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

//grunt.registerTask('clear', ['clean']);
    grunt.registerTask('test', ['concat', 'uglify', 'copy:main', 'nodeunit:main']);
    grunt.registerTask('default', ['concat', 'uglify', 'copy:main', 'copy:demo', 'yuidoc']);
    grunt.registerTask('demo', ['concat', 'uglify', 'copy:main', 'copy:demo']);
    grunt.registerTask('release', ['clean', 'concat:main', 'uglify:main', 'copy:dist']);

}
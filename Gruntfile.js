module.exports = function (grunt) {

    function stripVersion(dest, src) {
        return dest + src.replace(/-[0-9]+\.[0-9]+\.[0-9]+/, '');
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        rel: {
            name: '<%= pkg.name %>-<%= pkg.version %>'
        },
        clean: {
            src: ['target']
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
            }
        },
        less: {
            demo: {
                files: {
                    "target/<%= rel.name %>-demo.css": "src/demo/**.less"
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
                        src: ['target/<%= rel.name %>.js'],
                        dest: 'target/demo/js/',
                        flatten: true,
                        rename: stripVersion
                    },
                    {
                        expand: true,
                        src: ['target/<%= rel.name %>-demo.js'],
                        dest: 'target/demo/js/',
                        flatten: true,
                        rename: stripVersion
                    },
                    {
                        expand: true,
                        src: ['target/<%= rel.name %>-demo.css'],
                        dest: 'target/demo/css/',
                        flatten: true,
                        rename: stripVersion
                    }
                ]
            },
            dist: {
                expand: true,
                src: ['target/<%= rel.name %>.js', 'target/<%= rel.name %>.min.js'],
                dest: 'dist/',
                flatten: true
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

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

//grunt.registerTask('clear', ['clean']);
    grunt.registerTask('test', ['concat', 'uglify', 'copy:main', 'nodeunit:main']);
    grunt.registerTask('default', ['concat', 'uglify', 'copy:main', 'copy:demo', 'yuidoc']);
    grunt.registerTask('demo', ['concat', 'uglify', 'less:demo', 'copy:demo']);
    grunt.registerTask('release', ['clean', 'concat:main', 'uglify:main', 'copy:dist']);

}
module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        // Less task config
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "build/main.css": "src/main.less" // destination file and source file
                }
            }
        },
        // Browserify task config
        browserify: {
            options: {
                transform: ['reactify', 'debowerify']
            },
            dev: {
                options: {
                    debug: true
                },
                src: 'src/main.jsx',
                dest: 'build/bundle.js'
            },
            production: {
                options: {
                    debug: false
                },
                src: '<%= browserify.dev.src %>',
                dest: 'build/bundle.js'
            }
        },
        // Watch task config
        watch: {
            styles: {
                files: ['src/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true }
            },
            browserify: {
                files: 'src/*.jsx',
                tasks: ['browserify:dev']
            }
        }

    });

    grunt.registerInitTask('default',['less', 'browserify:dev', 'watch']);

}
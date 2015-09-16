module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    /*'js/libs/jquery.min.js',
                    'js/libs/modernizr.custom.25376.js',
                    'js/libs/classie.js',
                    'js/libs/menu.js',
                    'js/libs/jquery-ui.min.js',
                    'js/libs/jquery.googleSuggest.js',
                    'js/custom.js'*/
                    'js/libs/jquery.min.js',
                    'js/libs/jquery-ui.min.js',
                    'js/libs/jquery.googleSuggest.js',
                    'js/time.js',
                    'js/quote.js',
                    'js/google.search.js',
                    'js/ajax.call.js',
                    'js/ajax.links.js',
                    'js/local.storage.js',
                    'js/weather.js',
                    'js/background.js'
                ],
                dest: 'js/build/production.js',
                nonull: true
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                src: 'js/build/production.js',
                dest: 'build/js/production.min.js'
            }
        },


        cssmin: {
            combine: {
                files: {
                    'css_min/production.min.css': [
                        'css/normalize.css',
                        'css/demo.css',
                        'css/jquery-ui.css',
                        'css/component.css',
                    ]
                }
            }
        },

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['notify:gruntChange']
            },
            scripts: {
                files: ['js/*.js', 'js/libs/*.js'],
                tasks: ['concat', 'uglify']
            },
            css: {
                files: ['css/*.css','css/!*.min.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat','uglify','cssmin']);
    grunt.registerTask('set', ['concat','uglify','cssmin','watch']);
};
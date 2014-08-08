module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'js/libs/jquery-1.10.2.min.js',
                    'js/script.js'
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
                dest: 'js/build/production.min.js'
            }
        },


        cssmin: {
            combine: {
                files: {
                    'css_min/production.min.css': [
                        'css/mass_reset.css',
                        'css/custom.css',
                        'css/media.css'
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
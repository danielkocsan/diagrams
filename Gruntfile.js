module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            files: 'sass/**/*.scss',
            tasks: ['sass', 'concat']
        },
        sass: {
            dev: {
                files: {
                    'src/css/layout.css': 'sass/layout.scss',
                    'src/css/diagramWidget.css': 'sass/diagramWidget.scss'
                }
            }
        },
        concat: {
            default: {
                files: {
                    'src/dist/styles.css': ['src/css/*.css']
                }
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    // define default task
    grunt.registerTask('default', ['watch']);
};
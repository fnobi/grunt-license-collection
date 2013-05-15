## usage

```
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        license_collection: {
            dist: {
                src: ['src/js/lib/*.js', 'src/js/*.js'],
                dest: 'js/license.js',
                separator: '\n// license for FILEPATH\n'
            }
        }
    });

    grunt.loadNpmTasks('grunt-license-collection');

    grunt.registerTask('default', ['license_collection:dist']);
};
```

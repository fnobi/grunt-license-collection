module.exports = function (grunt) {
    // plugin info
    var taskName        = 'license_collection',
        taskDescription = 'generate license comment collection js.';

    // npm modules
    var colors = require('colors'),
        _      = grunt.util._;

    // library
    var extractLicenseComment = require('../lib/extractLicenseComment');

    // grunt setting
    grunt.file.defaultEncoding = 'utf8';

    // colors setting
    colors.setTheme({
        info  : 'green',
        warn  : 'yellow',
        error : 'erd'
    });

    grunt.registerMultiTask(taskName, taskDescription, function () {
        var target   = this.target,
            config   = grunt.config(taskName)[target],
            src      = config.src || [],
            destPath = config.dest || 'js/license.js',
            template = (config.separator || '').replace(/FILEPATH/g, '<%= filepath %>'),
            srcPaths = [],
            contents = [];

        if (typeof src == 'string') {
            src = [src];
        }

        // convert src pattern to path list
        _.each(src, function (pattern) {
            _.each(grunt.file.expand(pattern), function (srcPath) {
                srcPaths.push(srcPath);
            });
        });

        // extract license comment from each js files
        _.each(srcPaths, function (filepath) {
            var content = grunt.file.read(filepath),
                comment = extractLicenseComment(content);

            if (!comment) {
                console.log('%s %s', 'skip'.warn, filepath);
                return;
            }

            console.log('%s %s', 'ok  '.info, filepath);

            contents.push(grunt.template.process(template, {
                data: { filepath: filepath }
            }));
            contents.push(comment);
        });;

        // output file
        console.log('\n-> write license collection to %s', destPath);
        grunt.file.write(destPath, contents.join('\n'));
    });
};
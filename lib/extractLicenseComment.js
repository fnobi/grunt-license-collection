var extractLicenseComment = function (code) {
    var UglifyJS       = require('uglify-js'),
        toplevel       = UglifyJS.parse(code),
        isFirstComment = true,
        lines          = [];

    var walker = new UglifyJS.TreeWalker(function(node){
        var comments = node.start.comments_before;

        if (!comments.length) {
            return;
        }
        if (!isFirstComment) {
            return;
        }

        comments.forEach(function (comment) {
            lines.push(comment.value);
        });

        isFirstComment = false;
    });

    toplevel.walk(walker);

    if (!lines.length) {
        return null;
    }

    return ['/*', lines.join('\n'), '*/'].join('');
};

module.exports = extractLicenseComment;
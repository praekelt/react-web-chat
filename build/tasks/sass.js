'use strict';

var sass = require('node-sass');
var fs = require('fs');
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;

function compileSass() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // set default options
    options = Object.assign({
        style: 'expanded'
    }, options);

    // render the result
    var result = sass.renderSync({
        file: options.src,
        outputStyle: options.style
    });

    // write the result to file
    mkdirp(getDirName(options.dest), function (err) {
        if (err) return cb(err);
        fs.writeFile(options.dest, result.css);
    });

    // log successful compilation to terminal
    console.log(' ' + options.dest + ' built.');
}

// Expanded
compileSass({
    src: 'assets/scss/example.scss',
    dest: 'dist/css/example.css'
});

// Minified
compileSass({
    src: 'assets/scss/example.scss',
    dest: 'dist/css/example.min.css',
    style: 'compressed'
});
//# sourceMappingURL=sass.js.map
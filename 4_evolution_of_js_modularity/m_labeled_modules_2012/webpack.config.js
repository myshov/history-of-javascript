var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './scripts/hello.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.dependencies.LabeledModulesPlugin()
    ]
};

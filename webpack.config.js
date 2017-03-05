const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// common application properties
const appProperties = new (function() {
   this.isDebug = process.env.NODE_ENV !== "production";
   this.appName = 'app';
   this.appFile = './' + this.appName + '.js';
   this.inputDirName = 'client-app';
   this.outputDirName = 'dist';
   this.htmlTemplate = 'template.html';
   this.inputBaseDir = path.resolve(__dirname, 'src', this.inputDirName);
   this.outputBaseDir = path.resolve(__dirname, this.outputDirName);
})();

const styleLoader = {
   loader: 'style-loader',
   options: {
      sourceMap: appProperties.isDebug
   },
};

const scssLoader = {
   loader: 'css-loader',
   options: {
      modules: true,
      importLoader: 1,
      sourceMap: appProperties.isDebug,
      localIdentName: '[path]__[name]__[local]__[hash:5]'
   },
};

const cssLoader = {
   loader: 'css-loader',
   options: {
      sourceMap: appProperties.isDebug
   }
};

const postcssLoader = {
   loader: 'postcss-loader',
   options: {
      sourceMap: appProperties.isDebug,
      plugins: [
         require('precss'),
         require('postcss-cssnext')
      ],
      parser: require('postcss-scss')
   }
};

// the configuration
module.exports = {
   devtool: appProperties.isDebug ? "inline-source-map" : false, // inline-source-map source-map eval eval-source-map
   context: appProperties.inputBaseDir,
   entry: appProperties.appFile,
   output: {
      path: appProperties.outputBaseDir,
      filename: appProperties.appName + '.bundle.js'
      //,devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/i,
            loader: 'babel-loader',
            options: {
               presets: [
                  'es2015', 'react'
               ],
               plugins: [
                  'react-html-attrs',
                  'transform-class-properties',
                  'transform-decorators-legacy'
               ]
            },
            include: appProperties.inputBaseDir
         }, {
            test: /\.css$/i,
            use: appProperties.isDebug
               ? [ styleLoader, cssLoader, postcssLoader ]
               : ExtractTextPlugin.extract({
                  fallback: styleLoader,
                  loader: [ cssLoader, postcssLoader ],
                  publicPath: appProperties.outputDirName
               })
         }, {
            test: /\.scss$/i,
            use: appProperties.isDebug
               ? [ styleLoader, scssLoader, postcssLoader ]
               : ExtractTextPlugin.extract({
                  fallback: styleLoader,
                  loader: [ scssLoader, postcssLoader ],
                  publicPath: appProperties.outputDirName
               })
         }, {
            test : /\.png$/,
            loader : "url-loader?limit=100000"
         }, {
            test : /\.jpg$/,
            loader : "file-loader"
         }, {
            test : /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader : 'url-loader?limit=10000&mimetype=application/font-woff'
         }, {
            test : /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader : 'url-loader?limit=10000&mimetype=application/octet-stream'
         }, {
            test : /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader : 'file-loader'
         }, {
            test : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader : 'url-loader?limit=10000&mimetype=image/svg+xml'
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, appProperties.htmlTemplate),
         title: 'React Demo',
         filename: 'index.html',
         hash: true,
         minify: {
            collapseWhitespace: !appProperties.isDebug,
            removeComments: !appProperties.isDebug,
            useShortDocType: !appProperties.isDebug
         }
      }),
      new ExtractTextPlugin({
         filename: appProperties.appName + ".bundle.css",
         disable: false,
         allChunks: false
      }),
      new webpack.optimize.UglifyJsPlugin({
         beautify: appProperties.isDebug,
         comments: appProperties.isDebug,
         compress: !appProperties.isDebug,
         mangle: !appProperties.isDebug,
         sourceMap: appProperties.isDebug
      }),
      new OptimizeCssAssetsPlugin({
         assetNameRegExp: /\.scss$/g,
         cssProcessor: require('cssnano'),
         cssProcessorOptions: {
            discardComments: {
               removeAll: !appProperties.isDebug
            }
         },
         canPrint: true
      })
   ]
};

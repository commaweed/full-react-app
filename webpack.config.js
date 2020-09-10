const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// common application properties
const appProperties = new (function() {
   this.isDebug = process.env.NODE_ENV !== "production";
   
   this.currentDirectory = __dirname;
   this.appDirName = "client-app";
   this.appFileName = "app";
   this.contextDirectory = path.resolve(this.currentDirectory, "src");
   this.inputDirectory = path.resolve(this.currentDirectory, this.appDirName);
   this.outputDirectory = path.resolve(this.currentDirectory, "target", this.appDireName);
   
   this.appName = 'app';
   this.appFile = './' + this.appName + '.js';
   this.inputDirName = 'client-app';
   this.outputDirName = 'dist';
   this.htmlTemplate = 'template.html';
   this.inputBaseDir = path.resolve(__dirname, 'src', this.inputDirName);
   this.outputBaseDir = path.resolve(__dirname, this.outputDirName);
})();

/**
* Formats the given name which can be used in files, data URIs, etc.  It is dependent upon the environment.
* @param name A formatted name according to the underlying environment.
* @returns {String}
*/
function formatName(name) {
   // hashing is good for cache busting
   return appProperties.isDebug === true ? name : name + '-[hash:12]';
}

/**
* Creates the plugins that are needed by webpack according to the environment.
*/
function createPlugins() {
   var plugins = [
      new webpack.optimize.CommonsChunkPlugin({
         name: 'vendor',
         minChunks: function(module) {
            // assumes vendor imports exist in node_modules directory
            return module.context && module.context.indexOf('node_modules') !== -1;
         }
      }),
      new HtmlWebpackPlugin({
         template: path.resolve(appProperties.currentDirectory, 'page-template.html'),
         filename: 'index.html',
         hash: true,
         minify: {
            collapseWhitespace: !appProperties.isDebug,
            removeComments: !appProperties.isDebug,
            useShortDocType: !appProperties.isDebug
         }
      }),
      new ExtractTextPlugin({
         filename: appProperties.appFileName + ".bundle.css",
         disable: false,
         allChunks: true // todo: set to false?
      }),
      new OptimizeCssAssetsPlugin({
         assetNameRegExp: /\.s?css$/g,
         cssProcessor: require('cssnano'),
         cssProcessorOptions: {
            discardComments: {
               removeAll: !appProperties.isDebug
            }
         },
         canPrint: true
      })      
   ];
   
   if (appProperties.isDebug) {
      // add development specific 
   } else {
      plugins.push(new webpack.optimize.UglifyJsPlugin({
         beautify: false,
         sourceMap: false,
         comments: false,
         mangle: true,
         compress: true
      }));
   }
   
   return plugins;
}

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
      localIdentName: '[path]__[name]__[local]__[hash:5]' // hash:base64:5 at work
   },
};

const cssLoader = {
   loader: 'css-loader',
   options: {
      sourceMap: appProperties.isDebug
   }
};

const theme = require('./antd-theme');
console.log("Using theme:", theme);
const lessLoader = {
   loader: 'less-loader',
   options: {
      sourceMap: appProperties.isDebug,
      modules: true,
      modifyVars: theme
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
   devtool: appProperties.isDebug ? "eval-source-map" : false, // inline-source-map source-map eval eval-source-map
   context: appProperties.inputBaseDir,
   // entry: [ 'bable-polyfill', path.resolve(appProperties.inputDirectory, appProperties.appFileName + ".js") ],
   entry: appProperties.appFile,
   output: {
      path: appProperties.outputBaseDir,
      filename: '[name].' + appProperties.appName + '.bundle.js'
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
                  'transform-decorators-legacy',
                  'transform-runtime',
                  'transform-object-spread-inline',
                  ['import', {
                     libraryName: 'antd',
                     style: true // true means use less or use 'css'
                  }]
               ]
               // , babelrc: false
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
            test: /\.less$/i,
            use: appProperties.isDebug
               ? [ styleLoader, cssLoader, lessLoader ]
               : ExtractTextPlugin.extract({
                  fallback: styleLoader,
                  loader: [ cssLoader, lessLoader ],
                  publicPath: appProperties.outputDirName
               }),
            include: /antd/
         }, {
            test: /\.scss$/i,
            use: appProperties.isDebug
               ? [ styleLoader, scssLoader, postcssLoader ]
               : ExtractTextPlugin.extract({
                  fallback: styleLoader,
                  loader: [ scssLoader, postcssLoader ],
                  publicPath: appProperties.outputDirName  // appProperties.outputDirectory (the rest have same)
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
   // plugins: createPlugins()
   plugins: [
      new webpack.optimize.CommonsChunkPlugin({
         name: 'vendor',
         minChunks: function (module) {
            // this assumes your vendor imports exist in the node_modules directory
            return module.context && module.context.indexOf('node_modules') !== -1;
         }
      }),
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
         assetNameRegExp: /\.s?css$/g,
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

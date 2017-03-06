#!/usr/bin/env bash

clear

# install webpack and supporting plugins
npm install -D webpack webpack-dev-server
npm install -D html-webpack-plugin extract-text-webpack-plugin optimize-css-assets-webpack-plugin cssnano

# npm scripting utilities
npm install -D rimraf

# install babel transpiler
npm install -D babel-core babel-loader
npm install -D babel-plugin-add-module-exports
npm install -D babel-plugin-react-html-attrs babel-plugin-transform-class-properties babel-plugin-transform-decorators-legacy
npm install -D babel-preset-es2015 babel-preset-react

# install file loaders
npm install -D file-loader url-loader resolve-url-loader

# install css loaders
npm install -D style-loader css-loader postcss-loader
npm install -D react-css-modules postcss-modules
npm install -D postcss-cssnext precss postcss-scss

# install utilities
npm install -S axios classnames ramda

# install react / bootstrap / redux
npm install -S react react-dom react-router react-redux redux
npm install -S react-router-redux
npm install -S react-icons
npm install -S gsap react-addons-transition-group react-addons-gsap-transition-group react-gsap-enhancer

# css themes
npm install -S react-css-themr

# vector graphics API
npm install -S raphael

# another rich ui library
npm install -S antd
# npm install -D babel-plugin-import

# uses google's material design spec
npm install -S material-ui react-tap-event-plugin font-roboto

# keyboard
npm install -S react-screen-keyboard
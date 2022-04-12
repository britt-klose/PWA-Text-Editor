const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// configure workbox plugins for a service worker and manifest file. *
//  CSS loaders and babel to webpack.*

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //Webpack plugin; to gen the html file & inject bundles
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Contact Cards'
      }),
      //Inject Manifest to inject custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      
      //Creates manifest.json 
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name:'JATE',
        description:'Takes notes with JavaScript syntax highlighting!',
        background_color:'#225ca3',
        theme_color:'#225ca3',
        start_url:'/',
        publicPath:'/',
        icons:[
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      //CSS Loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          //Using babel-loader to user ES6
          use:{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins:['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],  
            },
          },
        },
      ],
    },
  };
};
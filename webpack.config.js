const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpackMode = require('webpack-mode');
const  PROD = webpackMode.isProduction;

module.exports = {
    entry: [ './src/main.js', './src/scss/main.scss'],
    output: {
        filename: PROD ? 'bundle.min.js' : 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    performance: {
        maxEntrypointSize: 5120000,
        maxAssetSize: 5120000
    },
    devtool: "hidden-source-map",
    plugins: [

        new CopyPlugin({
            patterns: [
                { from: './*.html' },
                { from: './src/css/*.css', to: './demo.css' }
            ],
        }),
    ],
    module: {
        rules:
            [
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    exclude: [/node_modules/],
                    use: {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            outputPath: 'assets/',
                            name: '[name].[ext]'
                        }
                    }
                },
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                ["@babel/preset-env", {
                                    "targets": {
                                        "browsers":  ["> 0.25%, not dead"]
                                    },
                                    "useBuiltIns": "usage",
                                    "debug": true,
                                    "corejs": 3

                                }]
                            ],

                            "plugins": ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-block-scoping"]
                        }
                    }
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'bundle.min.css'
                            }
                        },
                        {
                            loader: 'extract-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }
            ]
    },

    optimization: {
        minimize: PROD,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: { mangle: true}
            }),
        ],
    }


};
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'client/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
        host: 'localhost',
        port: 8080,
        // match the output path
        contentBase: path.resolve(__dirname, 'dist'),

        // match the output 'publicPath'
        publicPath: '/',
        // fallback to root for other urls
        historyApiFallback: true,

        inline: true,

        //CORS WILL BREAK MONGOOSE.
        // headers: { 'Access-Control-Allow-Origin': '*' },
        /**
         * proxy is required in order to make api calls to
         * express server while using hot-reload webpack server
         * routes api fetch requests from localhost:8080/api/* (webpack dev server)
         * to localhost:3000/api/* (where our Express server is running)
         */
        proxy: {
            '/chatRoute/*': {
                target: 'http://localhost:3000/',
                secure: false
            },
        }
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /.(css|scss)$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html'
        })
    ],
    resolve: {
        // Enable importing JS / JSX files without specifying their extension
        extensions: ['.js', '.jsx']
    }
};

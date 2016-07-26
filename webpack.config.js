module.exports = {
  entry: "./js/planary.js",
  output: {
  	filename: "./js/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
     extensions: ["", ".js", ".jsx"]
   },
  module: {
   loaders: [
     {
       test: /\.jsx?$/,
       exclude: /(node_modules|bower_components)/,
       loader: 'babel',
       query: {
         presets: ['react', 'es2015']
       }
     },
     {
       test: /\.node$/,
       loader: "node-loader"
     }
   ]
 }
};

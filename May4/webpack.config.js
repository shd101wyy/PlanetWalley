var path = require('path')
module.exports = {
	entry: path.resolve(__dirname, 'www/app.jsx'),
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			 { test: /\.(js|jsx)$/, include: [path.resolve(__dirname, 'www')], exclude: [/node_modules/], loader: 'babel' },
       { test: /\.html$/, loader: 'raw' },
			 { test: /\.less$/, loader: 'style!css!less' },
			 { test: /\.css$/, loader: 'style!css' }
		]
	}
}

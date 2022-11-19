// module.exports = {
// 	devServer: {
// 		proxy: 'http://localhost:3333',
// 	},
// }

const webpack = require('webpack')
module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 1,
			}),
		],
	},
	chainWebpack: (config) => {
		config.optimization.delete('splitChunks')
	},
}

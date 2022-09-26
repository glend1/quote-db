const path = require('path')
module.exports = {
	webpackDevMiddleware: config => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300
		};
        return config
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},

}
//trailingSlash: true,
	/*async redirects() {
		return [
		  {
			source: '/',
			destination: '/1',
			permanent: true,
		  },
		]
	  }*/
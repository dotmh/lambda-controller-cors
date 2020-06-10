const {URL} = require('url');

module.exports = (config = {}) => {
	const _config = {
		...{
			allowed: '*'
		},
		...config
	};

	return {
		_originURL: null,
		isAllowed() {
			if (_config.allowed === '*') {
				return true;
			}

			if (Array.isArray(_config.allowed) && _config.allowed.includes(this.origin)) {
				return true;
			}

			return typeof _config.allowed === 'string' && this.origin === _config.allowed;
		},
		get originAsURL() {
			if (this._originURL === null) {
				this._originURL = new URL(this.headers.origin);
			}

			return this._originURL;
		},
		get origin() {
			return this.originAsURL.hostname;
		},
		get endpoint() {
			return this.originAsURL.origin;
		},
		isCorsRequest() {
			return 'origin' in this.headers;
		},
		cors() {
			if (this.isCorsRequest() && this.isAllowed()) {
				this.addHeader('Access-Control-Allow-Origin', this.endpoint);
				this.addHeader('Access-Control-Allow-Credentials', 'true');
			}
		},
		corsOptions() {
			this.addHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
				.send();
		}
	};
};

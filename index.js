/***
 *    Copyright 2020 DotMH Martin Haynes <oss@dotmh.io>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const {URL} = require('url');

/**
  * @module lambda-controller-cors
  */
 /**
	* A factory to create the CORS plugin object.
	*
	* @param {object} config The configuration object for the factory
	*		@property {string | array} [allowed=*] A domain, '*' or list of domains to return cors headers for.
	*
	* @return {object} The mixin object suitable to be added to lambda controller as a plugin.
	*
	* @author Martin Haynes <oss@dotmh.io>
  */
module.exports = (config = {}) => {
	const _config = {
		...{
			allowed: '*'
		},
		...config
	};

	return {
		_originURL: null,
		/**
		 * Checks to see if the current origin is allowed on the allowed list. 
		 * 
		 * @return {boolean} true it is allowed, false it is not. 
		 * 
		 * @author  Martin Haynes <oss@dotmh.io>
		 */
		isAllowed() {
			if (_config.allowed === '*') {
				return true;
			}

			if (Array.isArray(_config.allowed) && _config.allowed.includes(this.origin)) {
				return true;
			}

			return typeof _config.allowed === 'string' && this.origin === _config.allowed;
		},

		/**
		 * Return the origin information as a URL object 
		 * 
		 * @returns {URL} the url object for the origin. 
		 * 
		 * @see https://nodejs.org/dist/latest-v12.x/docs/api/url.html#url_class_url
		 * 
		 * @author  Martin Haynes <oss@dotmh.io> 
		 */
		get originAsURL() {
			if (this._originURL === null) {
				this._originURL = new URL(this.headers.origin);
			}

			return this._originURL;
		},
		/**
		 * Returns the origin subdomain and domain.
		 * 
		 * @returns {string} the origin without the port and protocol attached or path
		 * 
		 * @author  Martin Haynes <oss@dotmh.io> 
		 */
		get origin() {
			return this.originAsURL.hostname;
		},

		/**
		 * Returns the full origin but without the path. 
		 * 
		 * @returns {string} the origin without the path
		 * 
		 * @author  Martin Haynes <oss@dotmh.io> 
		 */
		get endpoint() {
			return this.originAsURL.origin;
		},

		/**
		 * Detects whether the origin is in the header i.e. it is an cors request
		 * 
		 * @returns {boolean} true its a cors request, false it is not. 
		 * 
		 * @author  Martin Haynes <oss@dotmh.io> 
		 */
		isCorsRequest() {
			return 'origin' in this.headers;
		},

		/**
		 * If the request is a cors request and the origin is whitelisted this adds the required headers
		 * to the response.
		 * 
		 * @author  Martin Haynes <oss@dotmh.io> 
		 */
		cors() {
			if (this.isCorsRequest() && this.isAllowed()) {
				this.addHeader('Access-Control-Allow-Origin', this.endpoint);
				this.addHeader('Access-Control-Allow-Credentials', 'true');
			}
		},

		/**
		 * This responds to the cors preflight with the correct headers.
		 */
		corsOptions() {
			this.addHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
				.send();
		}
	};
};

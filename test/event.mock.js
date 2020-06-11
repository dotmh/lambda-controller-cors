module.exports =

{
	resource: "/{id}",
	path: "/lastfm",
	httpMethod: "GET",
	headers: {
		Accept: "*/*",
		"Accept-Encoding": "gzip, deflate, br",
		"Accept-Language": "en-GB,en;q=0.5",
		"cache-control": "no-cache",
		"CloudFront-Forwarded-Proto": "https",
		"CloudFront-Is-Desktop-Viewer": "true",
		"CloudFront-Is-Mobile-Viewer": "false",
		"CloudFront-Is-SmartTV-Viewer": "false",
		"CloudFront-Is-Tablet-Viewer": "false",
		"CloudFront-Viewer-Country": "GB",
		Host: "j94vuai6re.execute-api.eu-west-1.amazonaws.com",
		origin: "http://127.0.0.1:8888",
		pragma: "no-cache",
		Referer: "http://127.0.0.1:8888/viewer.html",
		"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:76.0) Gecko/20100101 Firefox/76.0",
		Via: "2.0 716fd417a527ecd4f9d6cef2c9258583.cloudfront.net (CloudFront)",
		"X-Amz-Cf-Id": "WsV_G27zdtmiZ5x-TSfmmKXDW9H2TVPWh1daOxzWZxFJxHRUTFGQOQ==",
		"X-Amzn-Trace-Id": "Root=1-5eb2a585-e4dc692bf23e4e650224a9b0",
		"x-api-key": "ZcCWKTSzmPaS5Lutn6tts7TUCAIGZ8Xy3ay8j6pn",
		"X-Forwarded-For": "86.175.184.35, 70.132.46.167",
		"X-Forwarded-Port": "443",
		"X-Forwarded-Proto": "https"
	},
	multiValueHeaders: {
		Accept: [
			"*/*"
		],
		"Accept-Encoding": [
			"gzip, deflate, br"
		],
		"Accept-Language": [
			"en-GB,en;q=0.5"
		],
		"cache-control": [
			"no-cache"
		],
		"CloudFront-Forwarded-Proto": [
			"https"
		],
		"CloudFront-Is-Desktop-Viewer": [
			"true"
		],
		"CloudFront-Is-Mobile-Viewer": [
			"false"
		],
		"CloudFront-Is-SmartTV-Viewer": [
			"false"
		],
		"CloudFront-Is-Tablet-Viewer": [
			"false"
		],
		"CloudFront-Viewer-Country": [
			"GB"
		],
		Host: [
			"j94vuai6re.execute-api.eu-west-1.amazonaws.com"
		],
		origin: [
			"http://127.0.0.1:8888"
		],
		pragma: [
			"no-cache"
		],
		Referer: [
			"http://127.0.0.1:8888/viewer.html"
		],
		"User-Agent": [
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:76.0) Gecko/20100101 Firefox/76.0"
		],
		Via: [
			"2.0 716fd417a527ecd4f9d6cef2c9258583.cloudfront.net (CloudFront)"
		],
		"X-Amz-Cf-Id": [
			"WsV_G27zdtmiZ5x-TSfmmKXDW9H2TVPWh1daOxzWZxFJxHRUTFGQOQ=="
		],
		"X-Amzn-Trace-Id": [
			"Root=1-5eb2a585-e4dc692bf23e4e650224a9b0"
		],
		"x-api-key": [
			"ZcCWKTSzmPaS5Lutn6tts7TUCAIGZ8Xy3ay8j6pn"
		],
		"X-Forwarded-For": [
			"86.175.184.35, 70.132.46.167"
		],
		"X-Forwarded-Port": [
			"443"
		],
		"X-Forwarded-Proto": [
			"https"
		]
	},
	queryStringParameters: {
		format: "json",
		method: "user.getWeeklyArtistChart"
	},
	multiValueQueryStringParameters: {
		format: [
			"json"
		],
		method: [
			"user.getWeeklyArtistChart"
		]
	},
	pathParameters: {
		service: "lastfm"
	},
	stageVariables: null,
	requestContext: {
		resourceId: "vok221",
		resourcePath: "/{id}",
		httpMethod: "GET",
		extendedRequestId: "MG7M3FEeDoEFUZw=",
		requestTime: "06/May/2020:11:54:45 +0000",
		path: "/development/lastfm",
		accountId: "470663487076",
		protocol: "HTTP/1.1",
		stage: "development",
		domainPrefix: "j94vuai6re",
		requestTimeEpoch: 1588766085407,
		requestId: "66d99808-7946-497c-94be-337ecff02d7d",
		identity: {
			cognitoIdentityPoolId: null,
			cognitoIdentityId: null,
			apiKey: "ZcCWKTSzmPaS5Lutn6tts7TUCAIGZ8Xy3ay8j6pn",
			principalOrgId: null,
			cognitoAuthenticationType: null,
			userArn: null,
			apiKeyId: "gtjxx5qdke",
			userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:76.0) Gecko/20100101 Firefox/76.0",
			accountId: null,
			caller: null,
			sourceIp: "86.175.184.35",
			accessKey: null,
			cognitoAuthenticationProvider: null,
			user: null
		},
		domainName: "j94vuai6re.execute-api.eu-west-1.amazonaws.com",
		apiId: "j94vuai6re"
	},
	body: null,
	isBase64Encoded: false
};

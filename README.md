![Lambda Controller Logo](logo.svg)

Lambda Control - CORS
=====================
[![DotMH Future Gadget Lab](https://img.shields.io/badge/DotMH-.dev-red.svg?style=flat-square)](https://www.dotmh.io)
[![Lambda Controller Plugin](https://img.shields.io/badge/Plugin-λ%20Controller-red.svg?style=flat-square&color=F15024)](https://github.com/dotmh/lambda-controller)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/xojs/xo)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/46687995c7544ce3a72c36e6f978befd)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dotmh/lambda-controller-cors&amp;utm_campaign=Badge_Grade)
![Build](https://dotmh.semaphoreci.com/badges/lambda-controller-cors.svg)

Adds Cross Origin Resource Sharing (CORS) support to Lambda Controller. 

Installation
============

To Install

```sh
npm i @dotmh/lambda-controller-cors
```

Requires [Lambda Controller](https://github.com/dotmh/lambda-controller) to be installed. Lambda Controller is a peer dependancy and so won't be installed automatically

Usage
=====
The CORS plugin usage is slightly different to other plugins. To use CORS I recommend it you add it to the contrustor of your controller. 

i.e. 

```javascript
const Controller = require('@dotmh/lambda-controller');
const cors = require('@dotmh/lambda-controller-cors');

class MyController extends Controller {
  constructor(event, ctx, cb) {
    super(event,ctx,cb);
    this.add(cors());
    this.cors();
  }
}
```

This will add the cors plugin and configure the cors headers. 

You will notice that we call a function to add, this is because the cors plugin supplies a factory unlike other plugins. 

Configuration
=============
The CORS plugin supplies a factory unlike other Lambda Controller plugins. This is so that you can pass it a configuration. The CORS plugin takes a list of allowed origins that CORS requests can come from. 

Configuration Object
--------------------

```javascript
  // .... your controller class 
  this.add(cors({
    allowed: [
      'localhost', 
      'prod.example.com',
      'dev.example.com'
    ]
  }});
  // ... the rest of your controller 
```

Configuration Options
---------------------

### Allowed

`allowed` accepts ether a list of allowed domains , a single domain or a '*'. Whent the '*' is used cors is added to all hosts i.e. allow all. 

Extra Steps
===========

To fully support CORS in AWS API Gateway we have to do some extra configuration. If you are using the [Servless Framework](https://www.serverless.com/open-source/).

Options Route
-------------

CORS uses a preflight to the route to get the CORS headers before making a full request. To support this we have to configure the a route for options. To support this the mixin automatically adds a cors route handler to your controller called `corsOptions`. So we need to configure a handler for that 

```javascript
module.exports.corsOptions = function (event, ctx, callback) {
	(new Controller(event, ctx, callback)).corsOptions();
};
```

and then add that as an http event in the `serverless.yml`

```yaml
functions:
  corsOptions:
    handler: handler.corsOptions
    events:
      - http:
          path: "/"
          method: options
          cors:
            origin: '*'
            headers:
            - Content-Type
            - X-Amz-Date
            - Authorization
            - X-Api-Key
            - X-Amz-Security-Token
            - X-Amz-User-Agent
            allowCredentials: true
```

Every other route
-----------------

API Gateway needs to know what it should do with CORS requests. I.e. it needs enabling. This has to be done on everyone of your route

To do this you have to add the cors property to your route.

```yaml
cors:
  origin: '*'
  headers:
  - Content-Type
  - X-Amz-Date
  - Authorization
  - X-Api-Key
  - X-Amz-Security-Token
  - X-Amz-User-Agent
  allowCredentials: true
```

__PLEASE NOTE__ I hope to update this readme with the steps required when using [AWS SAM](https://aws.amazon.com/serverless/sam/) soon. 

Documentation
=============
For the API documentation see <https://dotmh.github.io/lambda-controller-request-body/>

Or to read locally 

```
npm run readdocs
```

Licence            
=======

This package is [Treeware](https://treeware.earth). If you use it in production, then we ask that you [**buy the world a tree**](https://plant.treeware.earth/dotmh/lambda-controller-request-body) to thank us for our work. By contributing to the Treeware forest you’ll be creating employment for local families and restoring wildlife habitats.

Credits
=======

Logo design by [@dotmh](https://www.dotmh.io)

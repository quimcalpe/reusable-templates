Reusable Templates
==================
Proof of concept weekend project with reusable templates rendered on server and on browser. Old browsers or browsers with javascript disabled will fallback to server rendering. Modern browsers will navigate through ajax calls and client side rendering.

`history.pushState()` is very useful in this scenario, URLs are seamless for visitors, no ugly hashes. Browsers without pushState support just act as old browsers and navigate with server rendering.

[![Build Status](https://travis-ci.org/quimcalpe/reusable-templates.png)](https://travis-ci.org/quimcalpe/reusable-templates)

### Throttling
I implemented a simple (and silly) throttling mechanism to balance to server rendering when resources available. It's just a concept, it's a fake algorithm, but it's a starting hook if someone is interested.

### Promises/A+
Just to play with incoming [Promises/A+](http://promisesaplus.com) standard, hacked up a tpl-helpers module to load templates from disk with very simple caching support.

### Used modules
* [Express](https://github.com/visionmedia/express) for web server
* [Handlebars](https://github.com/wycats/handlebars.js) for template parsing
* [Q](https://github.com/kriskowal/q) for promises handling
* [TAP](https://github.com/isaacs/node-tap) for simple testing

### Installation
Clone from GitHub:
```bash
$ git clone git://github.com/quimcalpe/reusable-templates.git
$ cd reusable-templates
```
With [npm](https://npmjs.org) do:
```bash
$ npm install
```

### Usage
```bash
$ npm start
```
Open a browser and point to `http://localhost:3000`

### Testing
```bash
$ npm test
```

### License
MIT
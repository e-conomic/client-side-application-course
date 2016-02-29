####Week2 Assignment discussion
1. Mutating state
* functions as first class citizens
* Discuss review and finish week2
* refs in React
* conditionals in JavaScript
* Merge week2

###Dependency management in javascript

1. Bundling/Module loading
  - Various tool: Browserify, Webpack
* What are modules?
  - CommonJS, AMD, UMD, CommonJS2
* What are packages?
  - npm?
* Minification and optimization

####Assignment
1. Copy your own week2 source code to a folder called week3/app
* Extract each react component to its separate file.
* remove all dependencies in the index.html and replace them with a file called `bundle.js`
* Use webpack for bundling all javascript files in a single entry point.
* Webpack configuration file can be found under `public/week3/` and should be copied to your own `week3` folder

In top of each file you `require` the dependencies:
```javascript
var React = require('react');
var Message = require('./message');
```

and you make sure to return the built component:
```javascript
module.exports = React.createClass({...});
```

You then need to run `npm install` while cwd being `week3/`.
Now you have all dependencies installed into `node_modules` and can now run `npm run build`. Webpack outputs an bundle file and you can now run your bundled app.

You can try to run `npm run build-prod` instead and then see a drop in bundle filesize when requesting it from browser.

react-app-rewire-blockstack [![npm version](https://img.shields.io/npm/v/react-app-rewire-blockstack.svg?style=flat)](https://www.npmjs.com/package/react-app-rewire-blockstack)
=============================

> Allows you to rewire your dev server and build process to support [`blockstack.js`](https://github.com/blockstack/blockstack.js) in a [`create-react-app`](https://github.com/facebookincubator/create-react-app) project.

[Blockstack](https://blockstack.org) offers simple, yet powerful APIs for building decentralized apps. While the API abstracts away a lot of the difficulty of communicating with the Bitcoin blockchain (including authentication and file storage), there's still some difficulty in configuring a Blockstack app's development server and build processes––particularly with a CRA (create-react-app) setup. CRA is arguably the most popular tool for bootstrapping React apps. "CRA apps" come pre-configured with an incredible, zero-config, developer experience. [The repository](https://github.com/facebookincubator/create-react-app) has over 53K stars on GitHub, and is actively maintained by Facebook. You can "[eject](https://stackoverflow.com/questions/48308936/what-does-this-react-scripts-eject-command-do)" in a CRA app to extend the configuration (with custom webpack and babel plugins, for example). The CRA documentation cautions against this, as ejecting results in less seamless React updates. A better route (in my opinion), is the [`react-app-rewired`](https://github.com/timarney/react-app-rewired) library, which allows for CRA apps to be configured via a custom fork of CRA's [`react-scripts`](https://github.com/facebook/create-react-app/tree/master). The `react-app-rewire-blockstack` package works with the latter method. To implement Blockstack in your CRA app, follow the instructions below:


## Installation

Whether you already have react-app-rewired installed doesn't matter. It's a peer dependency and will be installed if not already present in node_modules.

```sh
# with yarn:
$ yarn add -D react-app-rewire-blockstack
# with npm
$ npm install -D react-app-rewire-blockstack
```

## Usage

#### 1) Go into your `package.json` and make the following changes:
```diff
  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom"
  }
```

#### 2) In the root directory of your project, create a `config-overrides.js`
#### 3) Copy and paste:


```js
const {
  rewireBlockstackBuild,
  rewireBlockstackDevServer
} = require('react-app-rewire-blockstack')

module.exports = {

  webpack: (config, env) => {
    if(env === 'production') {
      config = rewireBlockstackBuild(config)
    }
    return config
  },

  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      let config = configFunction(proxy, allowedHost)
      config = rewireBlockstackDevServer(config)
      return config
    }
  }

}
```
#### 4) Enjoy building your decentralized app!!!

#### 5) Please file an issue if you come across any bugs and I'll do my best to help. Thank you!



###### This library has been released under the [MIT license](https://mit-license.org/)
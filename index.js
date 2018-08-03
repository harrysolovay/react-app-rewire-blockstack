const { getBabelLoader } = require('react-app-rewired')
const path = require("path")

module.exports.rewireBlockstackDevServer = (config) => {
  config.headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type"
  }
}

module.exports.rewireBlockstackBuild = (config) => {

  const babelLoader = getBabelLoader(config.module.rules)
  const includeConfig = ((source) => {
    if (!source) return []
    return Array.isArray(source)
      ? source
      : [source]
  })(babelLoader.include)

  const includes = [
    '../node_modules/bitcoinjs-lib',
    '../node_modules/tiny-secp256k1/ecurve',
    '../node_modules/base64url/dist/base64url',
    '../node_modules/base64url/dist/pad-string',
    '../node_modules/bip32',
  ]
    .map(modulePath => path.resolve(__dirname, modulePath))
    
    .reduce((accumulator, include) => {
      if (Array.isArray(include)) {
        return accumulator.concat(include)
      }
      accumulator.push(include)
      return accumulator
    }, includeConfig)

  babelLoader.include = includes

  return config

}
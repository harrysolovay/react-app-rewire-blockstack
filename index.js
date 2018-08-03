const fs = require('fs')
const path = require('path')
const { getBabelLoader } = require('react-app-rewired')

const rootDir = fs.realpathSync(process.cwd());
const resolveNodeModule = modulePath => path.resolve(`${ rootDir }/node_modules`, modulePath)

module.exports.rewireBlockstackBuild = (config) => {

  const babelLoader = getBabelLoader(config.module.rules)
  const includeConfig = ((source) => {
    if (!source) return []
    return Array.isArray(source)
      ? source
      : [source]
  })(babelLoader.include)

  const includes = [
    'bitcoinjs-lib',
    'tiny-secp256k1/ecurve',
    'base64url/dist/base64url',
    'base64url/dist/pad-string',
    'bip32',
  ]
    .map(resolveNodeModule)
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

module.exports.rewireBlockstackDevServer = (config) => {
  config.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
  return config
}
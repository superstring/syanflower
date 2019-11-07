/** K.Arthur 4/10/2019 */

const resolve = require('rollup-plugin-node-resolve');
const buildConfig = require('./package').buildConfig;

module.exports = {
  input: buildConfig.input,
  output: {
    file: buildConfig.middle,
    format: buildConfig.format[0],
    name: buildConfig.name, // necessary for iife
    sourcemap: buildConfig.sourcemap
  },
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    })
  ],
  external: ['axios']
};

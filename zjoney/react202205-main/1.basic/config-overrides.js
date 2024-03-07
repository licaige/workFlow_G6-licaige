const { override, disableEsLint, addDecoratorsLegacy } = require('customize-cra');
// Parsing error: This experimental syntax requires enabling one of the following parser plugin(s): "decorators-legacy", "decorators"

module.exports = override(
  disableEsLint(),
  addDecoratorsLegacy()
)
module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": false
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "globals": {
    "shaka": true,
    "m": true
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single",
      { "allowTemplateLiterals": true }
    ],
    "semi": [
      "error",
      "never"
    ],
    "max-len": [
      "warn",
      120
    ],
    "no-console": "warn",
    "curly": "error"
  }
}

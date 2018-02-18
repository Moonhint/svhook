'use strict';

const path = require('path');

module.exports = (() => {
  let root_path = __dirname;
  return {
    to_root: () => {
      return root_path;
    },
    to_app: () => {
      return `${root_path}/dist/webhook`;
    },
    to_configs: () => {
      return `${root_path}/dist/configs`;
    },
    to_tests: () => {
      return `${root_path}/tests`;
    },
    to_simulation: () => {
      return `${root_path}/simulation`;
    }
  };
})();

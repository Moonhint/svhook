'use strict';

const pathfinder = require('./pathfinder');
const path_to_default_setttings = `${pathfinder.to_configs()}/default_settings.json`;

let default_settings = require(`${path_to_default_setttings}`);

module.exports = (() => {
  let svhook_client;

  svhook_client = require(`${pathfinder.to_app()}`)(default_settings);

  return svhook_client;
})();

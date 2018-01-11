'use strict';

const pathfinder = require('./pathfinder');
const path_to_default_setttings = `${pathfinder.to_configs()}/default_settings.json`;

let default_settings = require(`${path_to_default_setttings}`);

module.exports = (overwrite_settings=null) => {
  let svhook_client;

  // if no specified settings use default settings
  if (overwrite_settings===null){
    svhook_client = require(`${pathfinder.to_app()}`)(default_settings)
  }else{
    svhook_client = require(`${pathfinder.to_app()}`)(overwrite_settings);
  }

  return svhook_client;
}

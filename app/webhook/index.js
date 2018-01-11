'use strict';


import express    from 'express';
import http       from 'http';
import execa      from 'execa';

import { Server } from './server.js';

module.exports = (default_settings) => {

  return {
    server: (opts) => {
      //TODO: validate if opts.port exist
      let app = express();
      let serverApp = new Server({ default_settings, app, opts, http, execa });
      return serverApp;
    }
  };
};

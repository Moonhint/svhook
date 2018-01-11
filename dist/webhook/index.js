'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _server = require('./server.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { MessagingAction }    from './action.helper';
// import { MessagingUtil }      from './util.helpers';

module.exports = default_settings => {

  return {
    server: opts => {
      //TODO: validate if opts.port exist
      let app = (0, _express2.default)();
      let serverApp = new _server.Server({ default_settings, app, opts, http: _http2.default, execa: _execa2.default });
      return serverApp;
    }
  };
};

//
// const { spawn } = require('child_process');
// const ls = spawn('ls', ['-la']);
//
// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });
//
// ls.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });
//
// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });
//# sourceMappingURL=index.js.map


// import { spawn } from 'child_process';
//# sourceMappingURL=index.js.map
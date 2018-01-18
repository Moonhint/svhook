'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _server = require('./server.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = default_settings => {

  return {
    server: opts => {
      //TODO: validate if opts.port exist
      let app = (0, _express2.default)();
      let serverApp = new _server.Server({ default_settings, app, body_parser: _bodyParser2.default, opts, http: _http2.default, execa: _execa2.default });
      return serverApp;
    }
  };
};
//# sourceMappingURL=index.js.map
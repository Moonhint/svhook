"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Server {

  // Depedency Injection:
  constructor({ default_settings, app, opts, http, execa } = {}) {
    // configuration default_settings
    this.default_settings = default_settings;

    // express app
    this.app = app;

    // server options
    this.opts = opts;

    // http client
    this.http = http;

    // spawn child process
    this.execa = execa;
  }

  hook(params) {
    var _this = this;

    //init all routes
    /*
    material {
      {
        webhook_name: webhook_name,
        webhook_url: webhook_url,
        bash_scripts: []
      }
    }
    */

    const materials = params.materials;
    const options = params.options;

    for (var i = 0; i < materials.length; i++) {
      this.app.route(`/svhook/${materials[i]["webhook_url"]}`).get((() => {

        let material = materials[i];
        let bash_scripts = material.bash_scripts;

        return (() => {
          var _ref = _asyncToGenerator(function* (req, res) {

            let result;

            for (var i = 0; i < bash_scripts.length; i++) {
              result = yield _this.execa.shell(bash_scripts[i]);
              console.log(result.stdout);
            }

            res.send(`${material.webhook_name} ok`);
          });

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        })();
      })());
    }

    //up server
    let server = this.http.createServer(this.app);

    server.listen(this.opts.port, () => {
      console.info(`svhook at port ${this.opts.port}`);
    });
  }
}exports.Server = Server;
;
//# sourceMappingURL=server.js.map
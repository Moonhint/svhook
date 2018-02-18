'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Server {

  // Depedency Injection:
  constructor({ default_settings, app, body_parser, opts, http, execa, cache } = {}) {
    // configuration default_settings
    this.default_settings = default_settings;

    // express app
    this.app = app;

    // body parser helper
    this.body_parser = body_parser;

    // server options
    this.opts = opts || default_settings.server;

    // http client
    this.http = http;

    // spawn child process
    this.execa = execa;

    // memory cache
    this.cache = cache;
  }

  hook(params) {
    var _this = this;

    const configs = params || this.default_settings.hook;

    //init all routes
    const materials = configs.materials;
    const options = configs.options || this.default_settings.hook.options;

    //body parser middleware
    this.app.use(this.body_parser.urlencoded({ extended: true, limit: '500mb' }));
    this.app.use(this.body_parser.json({ limit: '500mb' }));

    for (var i = 0; i < materials.length; i++) {
      this.app.route(`/svhook/${materials[i]["webhook_url"]}`).post((() => {

        let material = materials[i];
        let bash_scripts = material.bash_scripts;

        return (() => {
          var _ref = _asyncToGenerator(function* (req, res) {

            res.send(`${material.webhook_name} ok`);

            let result;

            for (var i = 0; i < bash_scripts.length; i++) {
              let curr_bash_script = bash_scripts[i];

              if (curr_bash_script.lookout) {
                let last_lookout = _this.cache.get(curr_bash_script.lookout);
                let lookout_script = curr_bash_script.script;

                if (last_lookout === null) {
                  _this.cache.put(curr_bash_script.lookout, 1, options.lookout_execution_delay, (() => {
                    var _ref2 = _asyncToGenerator(function* (key, value) {
                      console.info(`Script of "${key}" was stacked ${value} times before execution!`);
                      _this.print_and_execute(lookout_script, options.env);
                    });

                    return function (_x3, _x4) {
                      return _ref2.apply(this, arguments);
                    };
                  })());
                } else {
                  _this.cache.del(curr_bash_script.lookout);
                  _this.cache.put(curr_bash_script.lookout, last_lookout + 1, options.lookout_execution_delay, (() => {
                    var _ref3 = _asyncToGenerator(function* (key, value) {
                      console.info(`Script of "${key}" was stacked ${value} times before execution!`);
                      _this.print_and_execute(lookout_script, options.env);
                    });

                    return function (_x5, _x6) {
                      return _ref3.apply(this, arguments);
                    };
                  })());
                }
                console.info(`\nLooking out for another script with key "${curr_bash_script.lookout}"`);
                console.info(`If none is provided in ${(options.lookout_execution_delay / 60000).toFixed(2)} minutes I will execute the script...\n`);
              } else {
                _this.print_and_execute(curr_bash_script, options.env);
              }
            }
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

  print_and_execute(script, env) {
    var _this2 = this;

    return _asyncToGenerator(function* () {

      let result;

      try {
        console.log(`<----- [Execute] ${script} ------>`);
        result = yield _this2.execa.shell(script, { env });
        console.log(`<----- [Execution Output] ${script} ------>\n`);
        console.log(`${result.stdout}\n\n`);
      } catch (e) {
        console.error(e);
      }
    })();
  }

}exports.Server = Server;
;
//# sourceMappingURL=server.js.map
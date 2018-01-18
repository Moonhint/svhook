export class Server {

  // Depedency Injection:
  constructor({ default_settings, app, body_parser, opts, http, execa } = {}) {
    // configuration default_settings
    this.default_settings = default_settings;

    // express app
    this.app = app;

    // body parser helper
    this.body_parser = body_parser;

    // server options
    this.opts = opts;

    // http client
    this.http = http;

    // spawn child process
    this.execa = execa;
  }

  hook(params) {
    //init all routes
    const materials = params.materials;
    const options = params.options;

    //body parser middleware
    this.app.use(this.body_parser.urlencoded({ extended: true , limit: '500mb'}));
    this.app.use(this.body_parser.json({limit: '500mb'}));

    for (var i = 0; i < materials.length; i++) {
      this.app.route(`/svhook/${materials[i]["webhook_url"]}`).post((
        () => {

          let material = materials[i];
          let bash_scripts = material.bash_scripts;

          return async (req, res) => {

            let result;

            for (var i = 0; i < bash_scripts.length; i++) {
              try {
                result = await this.execa.shell(bash_scripts[i]);
                console.log(result.stdout);
              } catch (e) {
                console.error(e);
              }
            }

            res.send(`${material.webhook_name} ok`);

          }

        }
      )());
    }

    //up server
    let server = this.http.createServer(this.app);

    server.listen(this.opts.port, () => {
      console.info(`svhook at port ${this.opts.port}`);
    });

  }
};

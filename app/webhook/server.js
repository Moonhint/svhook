export class Server {

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
    const configs = params || this.default_settings.hook;

    //init all routes
    const materials = configs.materials;
    const options = configs.options || this.default_settings.hook.options;

    //body parser middleware
    this.app.use(this.body_parser.urlencoded({ extended: true , limit: '500mb'}));
    this.app.use(this.body_parser.json({limit: '500mb'}));

    for (var i = 0; i < materials.length; i++) {
      this.app.route(`/${this.opts.route_prefix}/${materials[i]["webhook_url"]}`).post((
        () => {

          let material = materials[i];
          let bash_scripts = material.bash_scripts;

          return async (req, res) => {

            if (this.opts.print_req_body){
              console.log(req.body);
            }
            
            res.send(`${material.webhook_name} ok`);
            
            let ignore_execution = false;

            let material_branches = material.only_branches;
            let git_refs_arr = req.body.ref.split('/');
            let source_branch = git_refs_arr[git_refs_arr.length - 1];

            // check for eligible branches if specifed
            if (material_branches !== undefined){
              let founded_branch_index = material_branches.indexOf(source_branch)
              if (founded_branch_index === -1){
                // not found in eligible to execute branches, so will ignore execution
                ignore_execution = true;
                console.log(`<----- [Ignore Execute] reason: not eligible branch ------>`);
              }
            }

            if (!ignore_execution) {
              for (var i = 0; i < bash_scripts.length; i++) {
                let curr_bash_script = bash_scripts[i];
  
                if (curr_bash_script.lookout){
                  let last_lookout = this.cache.get(curr_bash_script.lookout);
                  let lookout_script = curr_bash_script.script;
  
                  if (last_lookout === null){
                    this.cache.put(curr_bash_script.lookout, 1, options.lookout_execution_delay, async (key, value) => {
                      console.info(`Script of "${key}" was stacked ${value} times before execution!`);
                      this.print_and_execute(lookout_script, options.env);
                    });
                  }else{
                    this.cache.del(curr_bash_script.lookout);
                    this.cache.put(curr_bash_script.lookout, last_lookout+1, options.lookout_execution_delay, async (key, value) => {
                      console.info(`Script of "${key}" was stacked ${value} times before execution!`);
                      this.print_and_execute(lookout_script, options.env);
                    });
                  }
                  console.info(`\nLooking out for another script with key "${curr_bash_script.lookout}"`);
                  console.info(`If none is provided in ${(options.lookout_execution_delay/60000).toFixed(2)} minutes I will execute the script...\n`);
                }else{
                  this.print_and_execute(curr_bash_script, options.env);
                }
              }
            }

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

  async print_and_execute(script, env){

    let result;

    try {
      console.log(`<----- [Execute] ${script} ------>`);
      result = await this.execa.shell(script, {env});
      console.log(`<----- [Execution Output] ${script} ------>\n`);
      console.log(`${result.stdout}\n\n`);
    } catch (e) {
      console.error(e);
    }

  }

};

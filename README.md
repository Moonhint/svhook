
# SvHook

Implementation of simple server on waiting for web-hooks post and execute shell scripts accordingly.

## Simulation:

```bash
require('svhook').server().hook();
```

this will run server hook with default_settings (only useful for simulation purpose in development mode)

post something to:
- http://localhost:2000/svhook/ls
- http://localhost:2000/svhook/pwd
- http://localhost:2000/svhook/exports
- http://localhost:2000/svhook/deploy_1
- http://localhost:2000/svhook/deploy_2


## Sample Usage [Basic]:

```bash

const svhook = require('svhook');

svhook.server({ port: 2000 })
  .hook({
    "materials": [
      {
        "webhook_name": "ls",
        "webhook_url": "ls",
        "bash_scripts": [
          "ls"
        ]
      },
      {
        "webhook_name": "pwdls",
        "webhook_url": "pwdls",
        "bash_scripts": [
          "pwd",
          "ls",
          "ls -lah"
        ]
      }
    ]
  });
```

post something to:
- http://localhost:2000/svhook/ls
- http://localhost:2000/svhook/pwdls


## Sample Usage [with Only Eligible Branches to Exceute]:

```bash

const svhook = require('svhook');

svhook.server({ port: 2000 })
  .hook({
    "materials": [
      {
        "only_branches": ["master", "staging"],
        "webhook_name": "pwd",
        "webhook_url": "pwd",
        "bash_scripts": [
          "pwd"
        ]
      }
    ]
  });
```

post something to:
- http://localhost:2000/svhook/pwd
- with body:

```bash
  {
    "ref": "refs/head/master",
    ...
  }
```


## Sample Usage [with ENV]:

```bash

const svhook = require('svhook');

svhook.server({ port: 2000 })
  .hook({
    "materials": [
      {
        "webhook_name": "exports",
        "webhook_url": "exports",
        "bash_scripts": [
          "echo $SVHOOK_ENV"
        ]
      }
    ],
    "options": {
      "env":{
        "SVHOOK_ENV": "development"
      }
    }
  });
```

post something to:
- http://localhost:2000/svhook/exports



## Sample Usage [with Lookout Execution]:

Will check for script before executing, if there is another script with the same lookout key,
delay the execution and only will execute last script after delay time has passed.

```bash

const svhook = require('svhook');

svhook.server({ port: 2000 })
  .hook({
    "materials": [
      {
        "webhook_name": "deploy_1",
        "webhook_url": "deploy_1",
        "bash_scripts": [
          "echo do something",
          { "lookout": "deploy", "script": "echo run the same deploy script" }
        ]
      },
      {
        "webhook_name": "deploy_2",
        "webhook_url": "deploy_2",
        "bash_scripts": [
          "echo do something",
          { "lookout": "deploy", "script": "echo run the same deploy script" }
        ]
      }
    ],
    "options": {
      "lookout_execution_delay": 5000
    }
  });
```

Nb:
- if option lookout_execution_delay is not provided, default lookout time will be 1 minute;
- lookout_execution_delay is in millisecond

post something to (post it several times):
- http://localhost:2000/svhook/deploy_1
- http://localhost:2000/svhook/deploy_2

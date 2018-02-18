
# SvHook

Implementation of simple server for waiting web-hooks post and execute shell script accordingly.

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



## Sample Usage [with With Lookup Execution]:

will check for script before executing, if there is another script with the same lookup key,
delay execution and only will execute last script after delay time passed.

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
- if option lookout_execution_delay is not provided, default lookup time will be 1 minute;
- lookout_execution_delay is in millisecond

post something to (post it several times):
- http://localhost:2000/svhook/deploy_1
- http://localhost:2000/svhook/deploy_2

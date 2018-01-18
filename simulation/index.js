let svhook = require('./../index');

svhook
  .server({ port: 2000 })
  .hook({
    materials: [
      {
        webhook_name: "ls",
        webhook_url: "ls",
        bash_scripts: [
          "ls"
        ]
      },
      {
        webhook_name: "pwd",
        webhook_url: "pwd",
        bash_scripts: [
          "pwd"
        ]
      }
    ],
    options: {

    }
  });

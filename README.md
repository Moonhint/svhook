Can bootstrap express server with port


automatic serve webhook by array of object

svhook
  .server({ port: 2000, https_creds })
  .hook({
    materials: [
      {
        webhook_name: webhook_name,
        webhook_url: webhook_url,
        bash_script: [

        ]
      },
      {
        webhook_name: webhook_name,
        webhook_url: webhook_url,
        bash_script: [

        ]         
      },
      {
        webhook_name: webhook_name,
        webhook_url: webhook_url,
        bash_script: [

        ]
      }
    ],
    options: {

    }
  });

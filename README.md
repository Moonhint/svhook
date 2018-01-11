
Sample usage:

```bash
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
        webhook_name: "pwdls",
        webhook_url: "pwdls",
        bash_scripts: [
          "pwd",
          "ls -la",
        ]
      }
    ],
    options: {

    }
  });
```

post something to:
- http://localhost:2000/svhook/ls
- http://localhost:2000/svhook/pwdls

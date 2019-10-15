let svhook = require('./../index');

/* SIMULATION 1 */
svhook.server().hook();

/* SIMULATION 2 */
// svhook.server({ port: 2000 }).hook({
//     "materials": [
//       {
//         "webhook_name": "ls",
//         "webhook_url": "ls",
//         "bash_scripts": [
//           "ls"
//         ]
//       },
//       {
//         "webhook_name": "pwdls",
//         "webhook_url": "pwdls",
//         "bash_scripts": [
//           "pwd",
//           "ls",
//           "ls -lah"
//         ]
//       }
//     ]
//   });


/* SIMULATION 3 */
// svhook.server({ port: 2000 })
//   .hook({
//     "materials": [
//       {
//         "webhook_name": "exports",
//         "webhook_url": "exports",
//         "bash_scripts": [
//           "echo $SVHOOK_ENV"
//         ]
//       }
//     ],
//     "options": {
//       "env":{
//         "SVHOOK_ENV": "development"
//       }
//     }
//   });


/* SIMULATION 4 */
// svhook.server({ port: 2000 })
//   .hook({
//     "materials": [
//       {
//         "webhook_name": "deploy_1",
//         "webhook_url": "deploy_1",
//         "bash_scripts": [
//           "echo do something",
//           { "lookout": "deploy", "script": "echo run the same deploy script" }
//         ]
//       },
//       {
//         "webhook_name": "deploy_2",
//         "webhook_url": "deploy_2",
//         "bash_scripts": [
//           "echo do something",
//           { "lookout": "deploy", "script": "echo run the same deploy script" }
//         ]
//       }
//     ],
//     "options": {
//       "lookout_execution_delay": 5000
//     }
//   });


/* SIMULATION 5 */
// svhook.server({ port: 2000 }).hook({
//     "materials": [
//       {
//         "webhook_name": "ls",
//         "webhook_url": "ls",
//         "bash_scripts": [
//           "ls",
//           "cd ../",
//           "ls"
//         ]
//       },
//       {
//         "webhook_name": "pwdls",
//         "webhook_url": "pwdls",
//         "bash_scripts": [
//           "pwd",
//           "ls",
//           "ls -lah"
//         ]
//       }
//     ]
//   });
const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const {authorize} = require('./authlib.js');


authorize()
.then(()=>{
  console.log("\nDone with authorization check\n");
})
.catch(console.error);




const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const { authorize } = require("./authlib.js");
/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function list_records(auth) {
  //this authenticates the sheets api client
  const sheets = google.sheets({version: 'v4', auth});


  //this makes the api call to read data from the sheet. 
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '16mjKKM7yKNEXrBTJo1rzrW716Roz-gY3mh7CfvwYnLg',
    range: 'Orders Data!A2:G',
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }



  console.log('Name, PaymentMethod:');
  rows.forEach((row) => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[1]}, ${row[6]}`);
  });
}

authorize().then(list_records).catch(console.error);




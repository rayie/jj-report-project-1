const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

//this imports the authorize function from authlib.js, which handle the check for an existing token file (or the auth flow if it hasn't been done yet)
//It returns an authenticated client object that can be used to call Google APIs. In this example the specific Google API you're working with
//is the Google Sheets API (but there are others, like a GMail API, Google Drive API, etc)

const { authorize } = require("./authlib.js");

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function list_records(authClient) {
  //this instantiates the sheets client, and provides it with the authClient object, which it needs to access the sample Google Sheet (Orders) you have access to.
  const sheets = google.sheets({ version: "v4", auth: authClient });

  //this makes the api call to read data from the sheet.
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "16mjKKM7yKNEXrBTJo1rzrW716Roz-gY3mh7CfvwYnLg",
    range: "Orders Data!A2:G", //notice here that we are only asking for columns A to G, starting at row 2 (row 1 is the header)
  });

  //res now is a object that contains the data from the sheet. We can access it using res.data.values

  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }

  console.log("Name, PaymentMethod:");
  rows.forEach(row => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[1]}, ${row[6]}`);
  });
}

async function run_using_async() {
  let authClient = await authorize();
  await list_records(authClient);
}

/*
This code snippet defines a function run_using_promise that calls two other functions authorize and list_records using promises. 
If authorize resolves successfully, it calls list_records. 
If there is an error in either authorize or list_records, it logs the error to the console.
*/
function run_using_promise() {
  authorize().then(list_records).catch(console.error);
}

//run_using_async();

run_using_promise();

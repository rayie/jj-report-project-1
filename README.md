# jj-report-project-1

Sample Project for JJ

In a project directory on your machine, clone this repo, and cd into it:

```
git clone git@github.com:rayie/jj-report-project-1.git
cd jj-report-project-1
```

Then install the node.js libraries as defined in package.json

```
npm install
```

Create the client.json file as instructed in the email I sent you.

Do a one time authorization action to allow this app to read and write to Googlesheets that your google account has access to by:

```
node auth_setup.js
```

This should open a browser asking you to flow through the grants. Flow through it.
If you successfully do that, a token.json file should get created in your directory. Verify that it does.

THen try:

```
node app.js
```

You should see the data from the sample spreadsheet I shared with you.

Examine the code in the list_records function.

Here's some info on using the API that Google provides to read and write to googlesheets:

https://developers.google.com/sheets/api/guides/values#node.js

The auth steps above took care of authentication for you already. In `list_records` function, you 'll see that it makes use of the google.sheets api handler.  
That's what's making the call to "read" the spreadsheet contents.

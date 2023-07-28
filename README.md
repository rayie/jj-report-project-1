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

Do a one time authorization action to allow this app to read and write to Googlesheets that your google account has access to by:

```
node auth_setup.js
```

This should open a browser asking you to flow through the grants. Flow through it.
If you successfully do that, a token.json file should get created in your directory. Verify that it does.

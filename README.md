# jj-report-project-1

Sample Project for JJ

In a project directory on your machine, clone this repo, and cd into it:

```
git clone git@github.com:rayie/jj-report-project-1.git

cd jj-report-project-1
```

Then install the node.js libraries as defined in package.json by running:

```
npm install
```

Now go back to the email I sent you.
Create the client.json file as instructed in the email.

---

Once you have the client file created in your local repo, continue on:

Do a ONE time authorization action to allow this app to read and write to Googlesheets that your google account has access to by:

```
node auth_setup.js
```

This should open a browser asking you to flow through the grants. It will say something about the app not being verified - click on the "Advance" button, and just continue on to "Go to the Collge Game (unsafe)"
You should see another card asking you to allow/grant the app. Go ahead and proceed.
If you successfully do that, a token.json file should get created in your directory. Verify that it does by running command `cat token.json`

What you just went through was called a local authentication flow. The purpose of this is to let the Google development platform verify that you (as represented by your Google account) truly wants to 1) ENGAGE with the collegegame project that I setup through APIs AND 2) allow you to programmatically access your own Google account's data resources (Google sheets documents that your account owns or has access to, in this case).

It uses the browser to achieve this, becasue through the browser, you have established that you are signed in with your Google account and you've EXPLICITLY granted the agreement to engage.

This is what the `auth_setup.js` code in the repo (that you executed with `node auth_setup.js`) does:

1. First, it checks if there is an existing valid `token.json` file. If there is, it would not have done anything else.
2. If this is the first time you're doing this flow, the `token.json` file would NOT be there - so it's going to launch the auth flow sequence, and opens a browser and facilitate the flow I just described.

## <br/><br/>

> You don't need to be concerned about this part for now, but FYI - (How does the `node.js auth_setup.js` know to resume?)
>
> Notice that in your terminal where you ran `node auth_setup.js` - the process "hangs" (it freezes, as if waiting for something, while your browser opens). What's happening in the node.js code is (in addition to taking you to website) is that it fires up an http "server" on your local machine, listening on port 3000, for the sole purpose of providing itself a way to receive an event when you finish the grant steps in the browser.
> <br/><br/>
> When you complete the final grant in your browser, that page redirects back to an address of http://localhost:3000/oauthcallback?token=xxx. When your browser reaches this address (firing an http request to your local machine - which is listening on port 3000) - the node.js process running `auth_setup.js` receives this http request event - which is the signal it's waiting for that the grant completed along with the authenticated "token" as a parameter of the http request.
>
> Then it writes the `token.json` file in your local machine containing the token it received, and then exits the process.

## <br/><br/>

## Important:

Don't confuse the `jjclient1.json` with the resulting `token.json`.

The first (`jjclient1.json`) is a configuration file that does not contain a secret. It contains the information about the "project" on the Google developer platform, including what they call a "client ID" that is similar to a "user account".

The 2nd is a "credential" file that you must keep secret. It contains the actual AUTHENTICATION token that enables anyone with access to it to ACCESS your Google resources (your Googlesheets documents) - as that is what you did when you "Granted" above.

Accessing APIs (sometimes referred to as "consuming an API") typically involves the concept of a "client app" and the API provider. The client app or client project "consumes" the API services provided by the provider.

In this project - there are 3 parties (or roles) involved (sometimes you'll work on projects, like the weather API, where there is only 2 parties involved).

The 3 parties (or roles) involved are:

1.  The Google developer platform (the API provider)
2.  The API consuming project (or client app) (what I named "thecollegegame" - and what this repo is an example of)
3.  The data account holder - the end user of the app (#2) that makes use of the app. As you develop, you happen to play this role. But you realize that in realworld projects, you are building an "app" for other people/organizations to use. It's this party that does the "granting" in the auth flow above.

Another example (for the sake of clarity), could be:
You build an app (2) that consumes the Instagram API (1), that lets an end user your app (3) list out the 10 most recent comments they receive on their instagram posts. 3 parties involved:

1.  Instagram (the API provider)
2.  Your app that lists out comments (the client app)
3.  A user that uses your app - the user would need to perform some kind of authentication flow, granting your app access to their instagram data.

Realize that in a real app, the "end user" wouldn't be executing a node.js script as you did, obviously. They would start the process from a website you built, or a mobile app, and it's on that website or mobile app that kicks off the authentication flow for that user.

## <br/><br/>

## Accessing the sample Google Sheet document

This is where we get to the actual development of your app's value proposition:

I shared a google sheet containing fake sample data with your Google account:

https://docs.google.com/spreadsheets/d/1WWOveFDLc6PSBAycj4k5-L6PxVcl_Zns5jb-ugDtOMM/edit#gid=64476863

The identifier of this sheet is `16mjKKM7yKNEXrBTJo1rzrW716Roz-gY3mh7CfvwYnLg` - you can see this in the `app.js` code file.

Execute this code:

```
node app.js
```

I wrote sample code in
You should see the data from the sample spreadsheet I shared with you.

Examine the code in the list_records function.

Here's some info on using the API that Google provides to read and write to googlesheets:

https://developers.google.com/sheets/api/guides/values#node.js

The auth steps above took care of authentication for you already. In `list_records` function, you 'll see that it makes use of the google.sheets api handler.

That's what's making the call to "read" the spreadsheet contents.

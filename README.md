[![build](https://img.shields.io/circleci/build/github/corentinguilloteau/kth-devops-tauri-CD/main)](build)

# Demonstration of Continuous Delivery of a Tauri app

This repository holds the code used for the demonstration of CD of a Tauri app, during the
[DD2482](https://github.com/KTH/devops-course) course.

# Project structure

## Application

The `app` folder contains the Tauri application used to demonstrate the update

## Update server

The `update_server` folder contains the code for the NodeJS update server used to store the latest update metadata.

## CircleCI configuration

The `.circleci` folder contains the pipeline configuration for CircleCI.

# How to setup

## 1. Setup the update server

1. Install the NodeJS code in your server of choice
2. Run `cd update_server`
3. Run `npm run install`
4. Create an SQLite3 database named `updates.sqlite3` in `./database/stores/`
5. Set an environnement variable named `UPDATE_SERVER_SECRET` which will be used to authenticate new updates.
6. Set an environnement variable named `PORT` which will be the port used by the server.
7. Start the server with `npm start`.

_Note: Make sure your server is accessible via an URL using `https`._

## 2. Setup the application updates

1. Install Tauri ([see this tutorial](https://tauri.studio/docs/getting-started/))
2. Create the signing keys by running `cd app` and then `cargo tauri signer generate -w ./.keys/app.key`.
3. In `app/src-tauri/tauri.conf.json`, change the `cg-dev.rezel.net`in the field `tauri > updater > endpoints` by the
   url of your update server.
4. In the same file, update the field `tauri > updater > pubkey` with the content of the file `app/.keys/app.key.pub`.

## 3. Setup the pipeline

1. Link the repository with CircleCI
2. In CircleCI, add a `GITHUB_TOKEN` environnement variable with your github token
   ([see this tutorial](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
   to create the token)
3. In CircleCI, add the following environnement variables: `UPDATE_SERVER_SECRET` being the password for the server,
   `UPDATE_SIGNING_KEY` being the application update signing private key (`app/.keys/app.key`) and
   `UPDATE_SIGNING_PASSWORD` the password for this key.

# How to run the demo

Once everything is setup, you can edit your code as you wish.

Once you want to deploy a new version, change the version field in `app/src-tauri/tauri.conf.json` to a higher version.

Then you can push your changes to the main branch of your repo.

Finally, wait for the pipeline to end and relaunch your app. Your should see an update notification. You can now update
your app with the new version

# Note on the tauri version

As I write this demonstration, Tauri updater has a hardcoded timeout set to 20 seconds for the update downloading. This
can result in errors if your network connection is not fast enough. A fix has been proposed but in not included in the
v1.0.0-rc.8 which is the latest version at the time I'm writing this. I thus implemented a quick fix myself by setting
this timeout at 2 minutes. The fix can be found in [this](https://github.com/corentinguilloteau/tauri/tree/demo)
repository, which is used by the code in this demo. If you try to run this demo in the future, you might be able to use
an official Tauri version.

# BluePrint Today #

<a href="https://assembly.com/blueprint-today/bounties?utm_campaign=assemblage&utm_source=blueprint-today&utm_medium=repo_badge"><img src="https://asm-badger.herokuapp.com/blueprint-today/badges/tasks.svg" height="24px" alt="Open Tasks" /></a>

[![alt](https://codenvy.com/factory/resources/factory-white.png)] (https://codenvy.com/f?id=ynpkoh9s0vjc3k4o)


## Homeschool scheduling and grade tracking application
This is a product being built by the Assembly community. You can help push this idea forward by visiting [https://assembly.com/blueprint-today](https://assembly.com/blueprint-today).

### How to develop with the Codenvy IDE ###

* IDE
    1. Launch [Blueprint Workspace](https://codenvy.com/f?id=ynpkoh9s0vjc3k4o)
    1. Click top right button to persist temp workspace to your account so you can access it again at a later time
* Running application
    1. Click run button to build and launch Docker runner
    1. Click docker application url once build is complete
    1. Running URL changes each time on Codenvy so default development runner uses email instead of setting up Google Login
* Submitting paches
    1. Merge from remote and test again if files changed
    1. Create pull request from Codenvy right hand pull menu
    1. Switch back to master branch to work on a new change
* Running with Google Login
    1. Create project in [Google App Engine](https://console.developers.google.com)
    1. Create a Client ID under APIs & Auth -> Credentials
    1. Get Google Client ID key and secret
    1. Edit app/private/Meteor.settings and add entry for your app Codenvy url
    1. Run with Meteor__Prod runner
* Issues running application in Codenvy
    * Adding Meteor packages has to be done by hand in app/.meteor/packages or in the Docker configuration

### Development ###

* Workspace Structure
    * /app: Meteor application
    * /app/client: Files only run from client
    * /app/client/lib: 3rd party packages not loaded as a Meteor package
    * /app/client/component: reusable meteor templates that could someday be a separate package
    * /app/client/template: UI modules
    * /app/client/page: UI pages
    * /app/common: Files run on both client and server
    * /app/server: Files only run on server
    * /app/public: Downloadable files like images and fonts
    * /app/private: server config files
* Libraries
    * Client
        * Bootstrap: Display framework
        * Handsontable: jQuery html tables 
    * Server
    * Common to Client and Server
        * Moment: Date formatting and parsing
* Meteor
    * Edits get deployed on-the-fly and show up without restarting meteor or refreshing browser
    * All html gets combined as a single unit and sent to client
    * All Javascript files are run without a specific main method to start
    * Startup method in main.js files are run once Meteor is completely up
    * Order in which js files are run is based on file structrue depth

### Accessing Mongo DB ###

1. Run application
1. From inside app directory with bash shell run: meteor mongo
1. Inside mongo shell type: show db
1. Type: use mongo
1. To see all collections type: show collections
1. To show all records type: db.school_term.find()
1. To remove all records: db.school_term.remove()



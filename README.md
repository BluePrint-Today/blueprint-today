# BluePrint Today #

<a href="https://assembly.com/blueprint-today/bounties?utm_campaign=assemblage&utm_source=blueprint-today&utm_medium=repo_badge"><img src="https://asm-badger.herokuapp.com/blueprint-today/badges/tasks.svg" height="24px" alt="Open Tasks" /></a>

[![alt](https://codenvy.com/factory/resources/factory-white.png)] (https://codenvy.com/f?id=ynpkoh9s0vjc3k4o)


## Homeschool scheduling and grade tracking application
This is a product being built by the Assembly community. You can help push this idea forward by visiting [https://assembly.com/blueprint-today](https://assembly.com/blueprint-today).

### How to contribute to the project ###
* Running application
    1. Launch [Blueprint Workspace](https://codenvy.com/f?id=ynpkoh9s0vjc3k4o)
    1. Click top right button to persist temp workspace to your account so you can access it again at a later time
    1. Click run button to build and launch Docker runner
    1. Click docker application url once build is complete
    1. Edits get deployed on-the-fly and show up without restarting meteor or refreshing browser 
* Submitting paches
    1. Merge from remote and test again if files changed
    1. Create pull request from Codenvy right hand pull menu
    1. Switch back to master branch to work on a new change
* Issues running application in Codenvy
    * Adding Meteor packages has to be done by hand in app/.meteor/packages or in the Docker configuration
    * URL changes with each run so default development runner sets up application to use email login instead of Google or Facebook which is what will be used in production

### Accessing Mongo DB ###

1. Run application
1. From inside app directory with bash shell run: meteor mongo
1. Inside mongo shell type: show db
1. Type: use mongo
1. To see all collections type: show collections
1. To show all records type: db.school_term.find()
1. To remove all records: db.school_term.remove()



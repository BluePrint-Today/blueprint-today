# BluePrint Today #

[![alt](https://codenvy.com/factory/resources/factory-white.png)] (https://codenvy.com/f?id=3z9ajzy2artzvjn9)


## Homeschool scheduling and grade tracking application

### How to contribute to the project ###

We use Codenvy for our development platform. Instantly be ready to start coding. Easy to create pull requests when your task is done.

[See how easy it is to get started](http://youtu.be/uF_QCmq5SQA)

Prefer everyone work in Codenvy and do pull requests from there - but if you choose to run from your own local box make sure you run with meteor --release 1.0.2.1 because that is the current release we are sticking to. We will upgrade versions but for product stability it won't be as often as Meteor releases.

* Running application
    1. Launch [Blueprint Workspace](https://codenvy.com/f?id=3z9ajzy2artzvjn9)
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

Using [zenhub](http://zhb.io/chrome) to manage github issues

### Accessing Mongo DB ###

1. Run application
1. From inside app directory with bash shell run: meteor mongo
1. Inside mongo shell type: show db
1. Type: use mongo
1. To see all collections type: show collections
1. To show all records type: db.school_term.find()
1. To remove all records: db.school_term.remove()


# Development Guide
Meteor is a single page application and all style/javascript changes can affect the entire application.  Multiple “pages” done through Iron Router are still part of the single page application and only appear to the end user as a separate page.  To help keep things compartmentalized we follow specific development conventions.

## Client GUI
For client GUI, Meteor templates are broken up into three categories: page, module, and component.  These are all located in respective directories under app/client.  All templates have a *.html file can have matching *.js and *.import.less files to hold the functionality and style associated with that template.

### Template Files
#### HTML
Template HTML should have a wrapping div with a unique class assigned so that styles can be scoped using selectors.
```
<template name=”Thing”>
<div class=”Thing”>
<!-- html for Thing goes in here -->

</div>
</template>
```

#### LESS
The matching less file needs to use the template unique class to namespace all styles.
```
.Thing{
  # less styles for Thing go in here
  div{
  }
  .someClass{
  }
  #someId{
  }
}
```

#### JAVASCRIPT
Javascript is automatically namespaced as long as you don’t have root level variables defined without var.

### Template Types
#### PAGE
Top level elements that represent a url location.  For pages representing application functionality they will most likely be very sparse and just have Meteor template injection points for where components/modules go.  For pages that represent traditional web pages they will generally contain all of the html content for the page with very few template injection points.

#### COMPONENT
Meteor templates that encapsulate specific and generic UI functionality.  They are not specific to this application, do not directly connect to model data sources, and could be reused in other applications.

#### MODULE
Like components except they encapsulate functionality specific to this application and will connect to model data sources.  Therefore they can not be reused in other applications but they do help in keeping the application compartmentalized and can be reused within this application.

### Global
The app/client/global.import.less is where font and color styles for the entire application go.  Since these styles will affect everything they are limited to just font and color and do not include element layout styling like display, justification, padding, or margin for common elements.  Those types of styles should be scoped inside specific templates. Global can include class definitoions for reusable class styles.

The layout.* files are for the base application structure.  The layout.less file is minimal and imports all of the *.import.less files from libraries, global, and templates.

Global client functions have to be loaded before everything else and are therefore located in app/client/lib/util.js

## Data Model
The data models need to be accessible from both client and server side and are located under app/common/model.

Changes to data model are done through Meteor methods so the logic is run on server for security.  Access convenience methods are added to the specific model object.  This allows for logic to be in a single place and the client GUI templates call these access methods instead of Meteor methods directly.


## File Structure
```
/app/          Main Meteor application
/app/client    Meteor client side code
/app/server    Meteor server side code
/app/common    Meteor code that runs on both client and server
/app/public    Public static resources

/app/client
/lib           3rd party and utility Javascript that needs to load first.  Subdirectories are loaded before parent directories
/page          Page layout for web pages and application pages
/module        App specific encapsulated web object with html, Javascript, and styles
/component     Generic Encapsulated web object with heml, Javascript, and styles 

/app/common
/lib           Libaries and utilities common to both client and serer
/model         Data models
```

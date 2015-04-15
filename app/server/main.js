//
// Startup function run after Meteor is up and running
//

// console.log("NODE_ENV = " + process.env.NODE_ENV); // development | production

Meteor.startup(function () {
  
  // Setup login service accounts
  Meteor.appLibs.setupAccounts()
  
})

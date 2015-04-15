//
// Sets up login service accounts
//

// console.log("ROOT_URL = " + process.env.ROOT_URL);

var settings = null
if(typeof(Meteor.appLibs) == 'undefined')
  Meteor.appLibs = []

//
// Lib function to set up all login service accounts
//
Meteor.appLibs.setupAccounts = function(){
  settings = Meteor.settings[process.env.ROOT_URL]
  
  if(typeof(settings) != 'undefined'){
    setAccountConfig("google")
  }else{
    console.log("Could not find settings for environment: " + process.env.ROOT_URL)
  }
}

function setAccountConfig(accountName){
  console.log("Looking up account: " + accountName)
  
  ServiceConfiguration.configurations.remove({
    service: accountName
  })
  
  if(typeof(settings[accountName]) != 'undefined'){
    console.log("Configuring account: " + accountName)
    
    ServiceConfiguration.configurations.insert({
      service: accountName,
      clientId: settings[accountName].key,
      secret: settings[accountName].secret
    })
  }
}

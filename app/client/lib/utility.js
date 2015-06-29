
Template.registerHelper('formatDate', function(utcDate){
   return moment.utc(utcDate).format('MM-DD-YYYY') 
})

Template.defaultProperty = function(object, name, defautlValue){
  if(object.data == null)
    object.data = {}
        
  if(object.data[name] == null){
    object.data[name] = defautlValue
  }
}

sendPageView = function (page){
  if(typeof ga != 'undefined'){
    ga('set', 'page', page)
    ga('send', 'pageview')
  }
}

sendPageEvent = function(target, event){
  if(typeof ga != 'undefined'){
    ga('send', 'event', target, event)
  }
}

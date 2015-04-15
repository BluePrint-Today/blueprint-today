
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
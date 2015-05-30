
var recordIdPattern = new RegExp('^[A-Za-z0-9 _-]*$')

checkLogIn = function(obj){
	if(typeof(obj.userId) == 'undefined' || obj.userId == null){
     throw new Meteor.Error(404, "Please log in")
	}
}

hasId = function(obj){
	if(typeof(obj._id) != 'undefined' && obj._id != null)
     return true
   else
     return false
}

validateId = function(id){
  if(typeof(id) == 'undefined' || id == null)
     throw new Meteor.Error(404, "Null record id")
  if(!recordIdPattern.test(id))
     throw new Meteor.Error(404, "Invalid record id: " + id)
}

Meteor.subscription = function(pub, sub){
	if(Meteor.isClient){
		Meteor.subscribe(pub)
	}else{
		Meteor.publish(pub, sub)
	}
}
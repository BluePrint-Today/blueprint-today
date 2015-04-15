

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

Meteor.subscription = function(pub, sub){
	if(Meteor.isClient){
		Meteor.subscribe(pub)
	}else{
		Meteor.publish(pub, sub)
	}
}
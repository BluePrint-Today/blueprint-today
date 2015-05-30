
SchoolTerm = new Meteor.Collection("school_term")

// DAO Methods
SchoolTerm.save = function(schoolTerm){
  if(hasId(schoolTerm)){
    Meteor.call('updateSchoolTerm', schoolTerm)
  }else{
    schoolTerm._id = Random.id()
    Meteor.call('addSchoolTerm', schoolTerm)
  }
  return schoolTerm._id
}

SchoolTerm.delete = function(schoolTerm){
    Meteor.call('deleteSchoolTerm', schoolTerm)
}

// Collection
Meteor.subscription("allSchoolTerm",  function () {
	return SchoolTerm.find({userId: this.userId}, {})
});

Meteor.methods({
    
  updateSchoolTerm: function(schoolTerm){
    checkLogIn(this)
    check(schoolTerm.title, String)
    check(schoolTerm.year, Match.Integer)
    check(schoolTerm.month, Match.Integer)
    check(schoolTerm.date, Match.Integer)
    var start = moment.utc([schoolTerm.year, schoolTerm.month, schoolTerm.date])
    var monday = moment.utc([schoolTerm.year, schoolTerm.month, schoolTerm.date]).startOf('isoWeek')

    if(hasId(schoolTerm))
	 	SchoolTerm.update({_id: schoolTerm._id, userId: this.userId}, {$set: {title: schoolTerm.title, startDate: start.toDate(), mondayDate: monday.toDate()}})
  },
  
  addSchoolTerm: function(schoolTerm){
    checkLogIn(this)
    check(schoolTerm.title, String)
    check(schoolTerm.year, Match.Integer)
    check(schoolTerm.month, Match.Integer)
    check(schoolTerm.date, Match.Integer)
    var start = moment.utc([schoolTerm.year, schoolTerm.month, schoolTerm.date])
    var monday = moment.utc([schoolTerm.year, schoolTerm.month, schoolTerm.date]).startOf('isoWeek')

    if(hasId(schoolTerm)){
      validateId(schoolTerm._id)
      SchoolTerm.insert({_id: schoolTerm._id, userId: this.userId, title: schoolTerm.title, startDate: start.toDate(), mondayDate: monday.toDate()})
    }else{
      SchoolTerm.insert({userId: this.userId, title: schoolTerm.title, startDate: start.toDate(), mondayDate: monday.toDate()})
    }
  },
  
  
  deleteSchoolTerm: function(schoolTerm){
    checkLogIn(this)
    
    if(hasId(schoolTerm))
	 	SchoolTerm.remove({_id: schoolTerm._id, userId: this.userId})
  }
  
})

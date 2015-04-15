
SchoolTerm = new Meteor.Collection("school_term")

Meteor.subscription("allSchoolTerm",  function () {
	return SchoolTerm.find({userId: this.userId}, {})
});

Meteor.methods({
    
  saveSchoolTerm: function(schoolTerm){
    checkLogIn(this)
    check(schoolTerm.title, String)
    check(schoolTerm.year, Match.Integer)
    check(schoolTerm.month, Match.Integer)
    check(schoolTerm.date, Match.Integer)
    var start = moment.utc([schoolTerm.year, schoolTerm.month, schoolTerm.date])
    var monday = moment.utc([schoolTerm.year, schoolTerm.month, schoolTerm.date]).startOf('isoWeek')

    if(hasId(schoolTerm)){
	 	SchoolTerm.update({_id: schoolTerm._id, userId: this.userId}, {$set: {title: schoolTerm.title, startDate: start.toDate(), mondayDate: monday.toDate()}})
      return schoolTerm._id
    }else{
      return SchoolTerm.insert({userId: this.userId, title: schoolTerm.title, startDate: start.toDate(), mondayDate: monday.toDate()})
    }
  },
  
  deleteSchoolTerm: function(schoolTerm){
    checkLogIn(this)
    
    if(hasId(schoolTerm))
	 	SchoolTerm.remove({_id: schoolTerm._id, userId: this.userId})
  }
  
})


Student = new Meteor.Collection("student")

Meteor.subscription("allStudent",  function () {
	return Student.find({userId: this.userId}, {})
});

Meteor.methods({
    
  saveStudent: function(student){
    checkLogIn(this)
    check(student.name, String)

    if(hasId(student)){
	 	Student.update({_id: student._id, userId: this.userId}, {$set: {name: student.name}})
      return student._id
    }else
      return Student.insert({userId: this.userId, name: student.name})
  },
  
  deleteStudent: function(student){
    checkLogIn(this)
    
    if(hasId(student))
	 	Student.remove({_id: student._id, userId: this.userId})
  }
  
})

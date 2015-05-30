
Student = new Meteor.Collection("student")

// DAO Methods
Student.save = function(student){
  if(hasId(student)){
    Meteor.call('updateStudent', student)
  }else{
    student._id = Random.id()
    Meteor.call('addStudent', student)
  }
  return student._id
}

Student.delete = function(student){
  Meteor.call('deleteStudent', student)
}

// Collection
Meteor.subscription("allStudent",  function () {
	return Student.find({userId: this.userId}, {})
});

Meteor.methods({
    
  updateStudent: function(student){
    checkLogIn(this)
    check(student.name, String)

    if(hasId(student))
	   Student.update({_id: student._id, userId: this.userId}, {$set: {name: student.name}})
  },
  
  addStudent: function(student){
    checkLogIn(this)
    check(student.name, String)

    if(hasId(student)){
      validateId(student._id)
      Student.insert({_id: student._id, userId: this.userId, name: student.name})
    }else
      Student.insert({userId: this.userId, name: student.name})
  },
  
  deleteStudent: function(student){
    checkLogIn(this)
    
    if(hasId(student))
	 	Student.remove({_id: student._id, userId: this.userId})
  }
  
})

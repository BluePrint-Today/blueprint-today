
Course = new Meteor.Collection("course")

Meteor.subscription("allCourse",  function () {
	return Course.find({userId: this.userId}, {})
});

Meteor.methods({
    
  saveCourse: function(course){
    checkLogIn(this)
    check(course.title, String)

    if(hasId(course))
	 	Course.update({_id: course._id, userId: this.userId}, {$set: {title: course.title, students: course.students}})
    else
      return Course.insert({termId: course.termId, userId: this.userId, title: course.title, students: course.students, days: []})
  },
  
  saveCourseDescription: function(courseId, dayNumber, descriptionInfo){
    var description = descriptionInfo.description
    var gradeType = descriptionInfo.gradeType
    checkLogIn(this)
    var count = Course.update({_id: courseId, userId: this.userId, 'days.dayNumber': dayNumber}, {$set: {'days.$.description': description, 'days.$.gradeType': gradeType} })
    if(count == 0)
      Course.update({_id: courseId, userId: this.userId}, {$push: {'days': {dayNumber: dayNumber, description: description, 'gradeType': gradeType} } })
  },
  
  saveCourseGrade: function(courseId, studentId, dayNumber, gradeText){
    var gradeData = Course.calculateGradeData(gradeText)
    checkLogIn(this)
    var field = studentId
    var obj = {}
    obj['days.$.' + field] = gradeData
    var count = Course.update({_id: courseId, userId: this.userId, 'days.dayNumber': dayNumber}, {$set: obj })
    if(count == 0){
      obj = {dayNumber: dayNumber}
      obj[field] = gradeData
      Course.update({_id: courseId, userId: this.userId}, {$push: {'days': obj } })
    }
  },
  
  deleteCourse: function(course){
    checkLogIn(this)
    
    if(hasId(course))
	 	Course.remove({_id: course._id, userId: this.userId})
  }
  
})

Course.setDescription = function(courseId, week, dow, descriptionInfo){
  var dayNumber = +dow + ((week - 1) * 7)
  Meteor.call('saveCourseDescription', courseId, dayNumber, descriptionInfo)
}

Course.setGrade = function(courseId, studentId, week, dow, gradeText){
  var dayNumber = +dow + ((week - 1) * 7)
  Meteor.call('saveCourseGrade', courseId, studentId, dayNumber, gradeText)
}


Course.getSchedule = function(termId, week){
  var schedule = []
  var courses = Course.find({termId: termId}, {sort: {title: 1}}).fetch()
  var students = Student.find({}, {sort:{name: 1}}).fetch()
  
  for(var s = 0; s < students.length; s++){
    var student = students[s]
    
    var courseGroup = {
      grade: student.name,
      _header: true
    }
    schedule.push(courseGroup)
    
    for(var c = 0; c < courses.length; c++){
      var course = courses[c]
      var days = course.days || []
      var enrolled = course.students || []
      if($.inArray(student._id, enrolled) != -1){
        var courseSchedule = {
          title: course.title,
          grade: calculateTotalGrade(days, student),
          studentId: student._id,
          courseId: course._id,
          weekNumber: week,
          g1: getGrade(days, student, week, 1),
          d1: getDescription(days, week, 1),
          g2: getGrade(days, student, week, 2),
          d2: getDescription(days, week, 2),
          g3: getGrade(days, student, week, 3),
          d3: getDescription(days, week, 3),
          g4: getGrade(days, student, week, 4),
          d4: getDescription(days, week, 4),
          g5: getGrade(days, student, week, 5),
          d5: getDescription(days, week, 5),
          g6: getGrade(days, student, week, 6),
          d6: getDescription(days, week, 6),
          g7: getGrade(days, student, week, 7),
          d7: getDescription(days, week, 7)
        }
        schedule.push(courseSchedule)
      }
    }
  }
  
  return schedule
}

Course.calculateGradeData = function(gradeText){
   var gradeData = {}
   if(gradeText){
    var gradeValue = null
    var vals = gradeText.split('/')
    if(vals.length == 2){
      var v1 = Number(vals[0])
      var v2 = Number(vals[1])
      gradeValue = (v1 / v2) * 100
    }else if(gradeText.trim() != ''){
      gradeValue = Number(gradeText)
    }else{
      gradeValue = null
    }
    if(gradeValue != null && !isFinite(gradeValue)){
      gradeText = ""
      gradeValue = null
    }
    gradeData = {text: gradeText, value: gradeValue}
   } 
      
   return gradeData
}
 
function getGrade(days, student, week, dayOfWeek){
  for(var i = 0; i < days.length; i++){
    var courseDay = days[i]
    if(courseDay.dayNumber == +dayOfWeek + ((week - 1) * 7)){
      return courseDay[student._id] || {}
    }
  }
  return {}
}

function calculateTotalGrade(days, student){
  var gradeSummary= {}
  // Summarize by grade type
  for(var i = 0; i < days.length; i++){
    var courseDay = days[i]
    var studentGradeData = courseDay[student._id] || {}
    var studentGrade = studentGradeData.value
    if( studentGrade && Number.isFinite(studentGrade)){
      var gradeType = courseDay.gradeType || ""
      var sumData = gradeSummary[gradeType] || {}
      var sumValue = sumData.value || 0.0
      var sumCount = sumData.count || 0
      sumValue = sumValue + studentGrade
      sumCount++
      sumData.value = sumValue
      sumData.count = sumCount
      gradeSummary[gradeType] = sumData
    }
  }
  
  // Calculate overall average
  var total = 0
  var count = 0
  for(var key in gradeSummary){
    if(gradeSummary.hasOwnProperty(key)){
      total = total + gradeSummary[key].value / gradeSummary[key].count
      count++
    }
  }
  
  if(count > 0)
    total = (total / count).toFixed(1)
  else
    total = ""
  return total
}

function getDescription(days, week, dayOfWeek){
  for(var i = 0; i < days.length; i++){
    var courseDay = days[i]
    if(courseDay.dayNumber == +dayOfWeek + ((week - 1) * 7)){
      var desc = courseDay.description  || ""
      var gType = courseDay.gradeType  || ""
      return {description: desc, gradeType: gType}
    }
  }
  return {}
}

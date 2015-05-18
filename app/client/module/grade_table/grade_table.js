Template.grade_table.created = function(){
  Session.set('current_week', 1)
}

Template.grade_table.rendered = function(){
  // Set selectable range
  var termId = Session.get('current_term')
  var t = SchoolTerm.findOne({_id: termId})
  var s= moment.utc(t.mondayDate)
  var e= moment(s).add(52, 'week').add(-1, 'day')
  
  this.picker = this.$('#scheduleWeekSelect').pickadate({
     min: new Date(s.format('MM-DD-YYYY')),
     max: new Date(e.format('MM-DD-YYYY')),
     selectMonths: true,
     selectYears: true,
     firstDay: 1,
     format: 'mm-dd-yyyy',
     container: '#scheduleWeekSelectContainer'
  }).pickadate('picker')
  
  this.picker.on('set', function(obj){
    // start date could change from another instance so re-get
    var term = SchoolTerm.findOne({_id: termId})
    var start = moment.utc(term.mondayDate)
    var selectedMonday = moment.utc(obj.select).startOf('isoWeek')
    var week = selectedMonday.diff(start, 'weeks') + 1
    if(week > 52)
      week = 52
    if(week < 1)
      week = 1
    Session.set('current_week', week)
  })
  
  // Set initial starting point when first rendering
  var c = moment.max(moment(), s)
  var c = moment.min(c, e)
  var d = new Date(c.format('MM-DD-YYYY'))
  this.picker.set('select', d)
}

Template.grade_table.helpers({
  data: function(){
    var templateInstance = Template.instance()
    
    return function(){
      var week = Session.get('current_week')
      var termId = Session.get('current_term')
      return Course.getSchedule(termId, week)
    }
  },
  
  options: function(){
    return {
      renderAllRows: true,
      viewportColumnRenderingOffset: 14,
      fixedColumnsLeft: 1,
      colWidths: [200, 60, 200, 60, 200, 60, 200, 60, 200, 60, 200, 60, 200, 60, 200],
      colHeaders: ['<input id="selectWeek" readonly/>', 
                   '', 'Monday', 
                   '', 'Tuesday', 
                   '', 'Wednesday', 
                   '', 'Thursday', 
                   '', 'Friday', 
                   '', 'Saturday', 
                   '', 'Sunday'],
      columns: [ {data: 'title'}, 
                {data: 'g1', type: 'grade'}, {data: 'd1', type: 'description'}, 
                {data: 'g2', type: 'grade'}, {data: 'd2', type: 'description'}, 
                {data: 'g3', type: 'grade'}, {data: 'd3', type: 'description'}, 
                {data: 'g4', type: 'grade'}, {data: 'd4', type: 'description'}, 
                {data: 'g5', type: 'grade'}, {data: 'd5', type: 'description'}, 
                {data: 'g6', type: 'grade'}, {data: 'd6', type: 'description'}, 
                {data: 'g7', type: 'grade'}, {data: 'd7', type: 'description'} ],
      
      afterChange: updateData,
      afterRender: updateWeekDisplay,
      afterScrollVertically: scrollHeaderFix
    }
  }
})

Template.grade_table.events({
  'click #selectWeek': function (e){
    Template.instance().picker.open()
    e.stopPropagation()
    e.preventDefault()
  }
})

function updateWeekDisplay(){
    var termId = Session.get('current_term')
    var term = SchoolTerm.findOne({_id: termId})
    var start = moment.utc(term.mondayDate)
    var week = Session.get('current_week') - 1
    start.add(week, 'weeks')
    var display = start.format('MM/DD') + ' - '
    start.add(6, 'days')
    display = display + start.format('MM/DD')
    $('#gradebook-container th input').val(display)
}

function updateData(change, source){
  // Don't run when loading
  if (source !== "loadData") {
    for (i = 0; i < change.length; i++) {
      //var oldVal = change[i][2]
      var newVal = change[i][3]
      var rowNum = change[i][0]
      var data = this.getSourceDataAtRow(rowNum)
      var week = data.weekNumber
      var courseId = data.courseId
      if(key === 'title'){
        // Update course title
      }else{
        var key = change[i][1]
        var dg = key.charAt(0)
        var day = key.charAt(1)
        if(dg === 'd'){
          // Update course day description
          Course.setDescription(courseId, week, day, newVal)
        }else{
          var studentId = data.studentId
          // Update course day student grade
          Course.setGrade(courseId, studentId, week, day, newVal.text)
        }
        
      }
    }               
  }
}

function scrollHeaderFix(){
  var p = $('#table-container').offset().top
  var h = $('.navbar').outerHeight()
  var offset = p - h
  var y = window.scrollY
  var t = $('.ht_clone_top')
  var c = $('.ht_clone_corner')
  if(y>offset){
    y = y - offset
    if(y > h)
      y = h
    t.css({top: y + 'px'})
    c.css({top: y + 'px'})
  }else{
    t.css({top: '0px'})
    c.css({top: '0px'})
  }
}
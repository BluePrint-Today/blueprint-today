Template.school_term_list.helpers({
  
  'items' : function () {
    return SchoolTerm.find({}, {sort: {startDate: 1, title: 1}})
  }, 
  
  'selectedItem': function () {
      var selectedId = Session.get('list_panel')
      if(selectedId){
        return SchoolTerm.findOne({_id: selectedId})
      }else
        return {}
    }
    
})

function configDialog(dialog){
   $(dialog).find('#schoolTermStart').pickadate({
     selectMonths: true,
     selectYears: true,
     firstDay: 1,
     format: 'mm-dd-yyyy'
   })
}

Template.school_term_list.events({
   
  'click .add_item': function(){
    Session.set('list_panel', null)
    Template.dialog_box.open('#school_term_dialog', 'add', configDialog)
  },
  
  'click .edit_item': function(){
    Template.dialog_box.open('#school_term_dialog', 'edit', configDialog)
  },
  
  'click .command_button': function(){
    Session.set('current_term', Session.get('list_panel'))
    Navigate('Gradebook')
  },
  
  'click .dialog_box_save': function(event){
    var titleTextBox = Template.instance().$('#schoolTermTitle')[0]
    var titleValue = titleTextBox.value.trim()
    var selectedId = Session.get('list_panel')
    var startTextBox = Template.instance().$('#schoolTermStart')[0]
    var startValue = startTextBox.value.trim()
    var startDate = moment(startValue, 'MM-DD-YYYY')
    if(titleValue.length > 0 && startDate != null){
      Meteor.call('saveSchoolTerm', {_id: selectedId, title: titleValue, year: startDate.year(), month: startDate.month(), date: startDate.date()}, function(err, id){
        if(!err)
      	Session.set('list_panel', id)
      })
      Template.dialog_box.close('#school_term_dialog')
    }
  },
  
  'click .dialog_box_delete': function(event){
    var selectedId = Session.get('list_panel')
    Meteor.call('deleteSchoolTerm', {_id: selectedId})
    Template.dialog_box.close('#school_term_dialog')
  }
  
})


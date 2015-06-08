Template.dialog_box.created = function(){
  Template.defaultProperty(this, 'data', {})
  this.mode = new ReactiveVar('none')
  this.openCallback = null
}

Template.dialog_box.rendered = function(){
  this.$('.dialog_box').on('hidden.bs.modal', function(){
   	// Fix page scroll bars for nested dialogs
      $('.modal:visible').length && $(document.body).addClass('modal-open')
    
      // Reset mode
      Blaze.getView(this).templateInstance().mode.set('none')
  })
  
  this.$('.dialog_box').on('shown.bs.modal', function(){
   	// Fix z-index of dialog and background for nested dialogs
      var zIndex = 1040 + (10 * $('.modal:visible').length);
      $(this).css('z-index', zIndex);
      $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    
      // Auto focus initial field
      $(this).find('.autoFocus').focus()
      
      // Call custom dialog setup
      var callback = Blaze.getView(this).templateInstance().openCallback
      if(callback != null)
        callback(this)
  })
}

Template.dialog_box.destroyed = function(){
  this.$('.dialog_box').off('hidden.bs.modal')
  this.$('.dialog_box').off('shown.bs.modal')
}

Template.dialog_box.helpers({
  
    'dialog_title': function (){
      var modeVal = Template.instance().mode.get()
      if( modeVal == 'add' )
        return "Add " + Template.instance().data.heading
      else if( modeVal == 'edit' )
        return "Edit " + Template.instance().data.heading
      else if( modeVal == 'none' )
        return null
      else
        return Template.instance().data.heading
    },
  
    'showDelete': function (){
      var modeVal = Template.instance().mode.get()
      if(modeVal == 'edit')
        return true
      else
        return false
    },
  
    'showDone': function(){
      var modeVal = Template.instance().mode.get()
      return typeof(modeVal) == 'undefined'
    }
  
})

// Accessors for outside dialog_box template
Template.dialog_box.open = function(selector, modeVal, callback){
  var box = null
  if(Template.instance())
    box = Template.instance().$(selector)[0]
  else
    box = $(selector)[0]
  var boxTI = Blaze.getView(box).templateInstance()
  boxTI.mode.set(modeVal)
  boxTI.openCallback = callback
  $(box).modal('show')
}

Template.dialog_box.close = function(selector){
  var box = Template.instance().$(selector)[0]
  $(box).modal('hide')
}

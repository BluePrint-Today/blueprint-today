Meteor.startup(function () {
        
    // close moble nav bar when item click
    $(document).on('click', '.navbar-collapse.collapse.in a:not(.dropdown-toggle)', function() {
        $(this).closest(".navbar-collapse").collapse('hide');
    })
    $(document).on('click', '.navbar-collapse.collapse.in button:not(.navbar-toggle)', function() {
        $(this).closest(".navbar-collapse").collapse('hide');
    })
    
    // set inital page when signed in
    Deps.autorun(function(){
      if(Meteor.userId()) 
    		Navigate("Home")
    })
})

Template.body.helpers({
	page_template: function(){
		return Session.get("page_template")
	},
  
   breadcrumb_links: function(){
     var currentPage = Session.get("page_template")
     if(currentPage == 'Home'){
       return [{ status: 'active', title: 'Home' }]
     }else{
       return [
         {title: 'Home'},
         {status: 'active', title: currentPage}
       ]
     }
   }
})

Template.body.events({
  'click .breadcrumb li': function(event){
    Navigate(event.target.textContent)
  }
})
    
Navigate = function(page){
  Session.set("page_template", page)
}

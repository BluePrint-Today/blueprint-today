Template.htable.destroyed = function(){
  this.htable.destroy()
}

Template.htable.rendered = function(){
  var container = this.$("#table-container")[0]
  var config = this.data.config || {}
  config.data = []
  this.htable = new Handsontable(container, config)
    
  var htable = this.htable
  var df = this.data.data_function
  this.autorun( function(){
    var rows = df()
    htable.loadData(rows)
    updateProperties(htable)
    htable.render()
  })
}

function updateProperties(instance){
    var data = instance.getData()
    var settings = {
      cell: []
    }
    var mergeCells = []
   
    // Configure group header rows
    for(r = 0; r < data.length; r++){
      var row = data[r]
      if(row._header === true){
        mergeCells.push({
          row: r,
          col: 0,
          rowspan: 1,
          colspan: 2
        })
        //mergeCells.push({
          //row: r,
          //col: 2,
          //rowspan: 1,
          //colspan: 14
        //})
        for(c = 0; c < 16; c++){
          settings.cell.push({
            row: r,
            col: c,
            readOnly: true,
            renderer: headerRenderer
          })
        }
        //settings.cell.push({
          //row: r,
          //col: 2,
          //readOnly: true,
          //renderer: headerRenderer
        //})
      }
    }
    if(data.length > 0){
      instance.mergeCells = new Handsontable.MergeCells(mergeCells)
      instance.updateSettings(settings)
    }
}

function headerRenderer(instance, td, row, col, prop, value, cellProperties){
  if(row == 0){
    $(td).parent().parent().find('tr').removeClass('group-header')
  }
  $(td).parent().addClass('group-header')
  if(col == 0 && value)
    td.innerHTML = value + '<span class="groupIcon"></span>'
  else if(value)
    td.innerHTML = value
}

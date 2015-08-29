Template.htable.destroyed = function(){
  this.htable.destroy()
}

Template.htable.rendered = function(){
  var container = this.$("#table-container")[0]
  var config = this.data.config || {}
  config.data = []
  this.htable = new Handsontable(container, config)
  this.printableTable = $(this.$('#table-printable')[0])
    
  var htable = this.htable
  var printableTable = this.printableTable
  var df = this.data.data_function
  var printableColumns = config.printableColumns
  this.autorun( function(){
    var rows = df()
    htable.loadData(rows)
    updateProperties(htable)
    htable.render()
    updatePrintableTable(printableTable, rows, printableColumns)
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
        for(c = 0; c < 16; c++){
          settings.cell.push({
            row: r,
            col: c,
            readOnly: true,
            renderer: headerRenderer
          })
        }
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

function updatePrintableTable(table, data, printableColumns){
  table.empty()
  var parent = table
  
  for(r = 0; r < data.length; r++){
    var row = data[r]
    
    var tr = $('<tr></tr>')

    if(row._header === true){
      parent = $('<tbody></tbody>')
      table.append(parent)
      tr.addClass('group-header')
    }
    
    parent.append(tr)
    for(i = 0; i < printableColumns.length; i++){
      // columns can have a data path like d1.description
      var pc = printableColumns[i].split('.')
      appendColumn(tr, row, pc[0], pc[1])
    }
  }
}

function appendColumn(tr, row, colName, prop){
  var td = $("<td></td>")[0]
  var val = row[colName]
  if(typeof val != 'string')
    val = val[prop]
  if(!val)
    val = ''
  td.innerHTML = val.replace(/(?:\r\n|\r|\n)/g, '<br/>')
  tr.append(td)
}

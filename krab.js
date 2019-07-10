let datesList=[];
let dateTimeList=[];
let timeList = []
let dayIndexes = []
let bilang = []
let data = []

function uploadJson () {
    
}


$(document).ready(function(){
  var body   = $('#dashboard-view'),
      nav    = $('.data-menu'),
      panels = $('.panel');

    getTableData()
    console.log("dataa " + data)
    
  nav.on('click', 'a', function(e){
    e.preventDefault();
    var dest = $(this).data('panel-link');
    body
      .removeClass(function (index, css) {
        // remove only classes start with show-
        // http://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
        return (css.match ( /\bshow-\S+/g ) || []).join(' ');
      })
      .addClass('show-' + dest);
    console.log(dest);
    console.log(body.attr('class'));
  });
})

function float2dollar(value) {
    return "U$ " + (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function renderTable(result) {
    console.log("eyyy")
    data = [result]
    $('#myTable').DataTable({
        data: result,
        "searching": false,
        columns: [
            { data: "datetime", title: "Date / Time"},
            { data: "burger", title: "Burger"},
            { data: "species", title: "Customer Species"}
          ]
      });
}

function getTableData() {
    $.ajax({
        url: "http://localhost:3000/sales",
        success: function (result) {
            console.log("pasok")
            $("#loadingMessage").html("");
            data = result;
            retrieveSalesIndexFilters(data)
            
            let filteredSales = filterByDateTime("2019-06-07", "12")
            console.log(result)
            console.log(filteredSales)
            renderTable(filteredSales);
            
        },
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    });
}

function retrieveSalesIndexFilters (result) {
    for (let key in result) {
        let temp = result[key].datetime
        let formatted = temp.substring(0,10);
        tempDate = formatted;
        let tempDateTime = temp.substring(11,19);
        if(datesList.length===0){
            datesList.push(formatted);
            dayIndexes.push(new Array())
            dayIndexes[0].push(key)
            timeList.push(new Array())
            timeList[0].push(tempDateTime)
        }
        else{
            let isInList = false
            for(let i=0;i<datesList.length;i++){
                if(datesList[i] === tempDate){
                    dayIndexes[i].push(key)
                    timeList[i].push(tempDateTime)
                    isInList = true
                }
            }

            if (!isInList) {
                datesList.push(formatted);
                dayIndexes.push(new Array())
                dayIndexes[dayIndexes.length - 1].push(key)
                timeList.push(new Array())
                timeList[timeList.length - 1].push(tempDateTime)
            }
        }
        // timeList.push(tempDateTime)
        dateTimeList.push(temp);        
    }
    for(let i=0;i<dayIndexes.length;i++){
        bilang.push(dayIndexes[i].length)
    }
}

function filterByDate(dateInput){
    let filteredSales = [];
    let dateIndex = -1;
    for(let i=0;i<datesList.length;i++){
        if(datesList[i] === dateInput){
            dateIndex = i;
            break;
        }
    }

    for (k in dayIndexes[dateIndex]) {
        filteredSales.push(data[k])
    }
    return filteredSales;
}

function filterByDateTime(dateInput, timeInput){
    let filteredSales = [];
    let dateIndex = -1;
    for(let i=0;i<datesList.length;i++){
        if(datesList[i] === dateInput){
            dateIndex = i;
            break;
        }
    }
    console.log(dayIndexes == null)

    for (let i = 0; i < dayIndexes[dateIndex].length; i++) {
        if (timeList[dateIndex][i].startsWith(timeInput)) {
            filteredSales.push(data[dayIndexes[dateIndex][i]])
        }
    }



    return filteredSales;
}
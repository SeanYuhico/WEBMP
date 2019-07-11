let datesList=[];
let dateTimeList=[];
let timeList = []
let dayIndexes = []
let bilang = []
let salesData = []
let burgerSpeciesData = []
let burgerData = []
let speciesData = []


$(document).ready(function(){
  var body   = $('#dashboard-view'),
      nav    = $('.data-menu'),
      panels = $('.panel');

    getTableData()
    
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
    //getTableData
    //getTableData2
  });
})

function float2dollar(value) {
    return "U$ " + (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function renderTables () {
    renderSalesTable();
    renderSpeciesTable();
    // renderBurgerTable();
    // renderSpeciesTable();
}

/*

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

*/

function renderSalesTable() {
    console.log("sales data: " + salesData)
    console.log("eyyy")
    data = salesData
    $('#myTable').DataTable({
        pagingType: "first_last_numbers",
        responsive: true,
        "bLengthChange": false,
        data: data,
        "searching": false,
        columns: [
            { data: "datetime", title: "Date / Time"},
            { data: "burger", title: "Burger"},
            { data: "species", title: "Customer Species"}
          ]
      });
}
function renderSpeciesTable() {
    console.log("species data: " + speciesData)
    data = [speciesData]
    console.log(speciesData)
    console.log(data)
    $('#specTable').DataTable({
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        bPaginate: false,
        data: data,
        "searching": false,
        columns: [
            { data: "leatherback turtle", title: "Leatherback Turtle"},
            { data: "salmon", title: "Salmon"},
            { data: "seahorse", title: "Seahorse"},
            { data: "coral", title: "Coral"},
            { data: "giant clam", title: "Giant Clam"},
            { data: "gray whale", title: "Gray Whale"},
            { data: "sea lion", title: "Sea Lion"}
          ]
      });
}

function renderBurgerTable() {
    console.log("eyyy")
    let data = [burgerData]
    console.log(data)
    
    dataTable = $('#burgTable').DataTable({
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        bPaginate: false,
        data: data,
        "searching": false,
        columns: [
            { data: "Krusty Combo", title: "Krusty Combo"},
            { data: "Krusty Deluxe", title: "Krusty Deluxe"},
            { data: "Krabby Pattie", title: "Krabby Pattie"}
          ]
      });
}

function renderBurgerSpeciesTable(index) {
    console.log("eyyy")
    console.log(burgerSpeciesData)
    let data = [burgerSpeciesData[index]]
    let num
    if (index === "Krusty Combo")
        num = "0"
    else if (index === "Krusty Deluxe")
        num = "1"
    else if (index === "Krabby Pattie")
        num = "2"
    
    console.log(data)
    dataTable = $('#burgSpecTable' + num).DataTable({
        "bLengthChange": false,
        "bFilter": true,
        "bInfo": false,
        bPaginate: false,
        data: data,
        "searching": false,
        columns: [
            { data: "leatherback turtle", title: "Leatherback Turtle"},
            { data: "salmon", title: "Salmon"},
            { data: "seahorse", title: "Seahorse"},
            { data: "coral", title: "Coral"},
            { data: "giant clam", title: "Giant Clam"},
            { data: "gray whale", title: "Gray Whale"},
            { data: "sea lion", title: "Sea Lion"}
          ]
      });
}

function getTableData() {
    getSalesData();
    getSpeciesData();
    getBurgerData();
    getBurgerSpeciesData();
    //renderTables()
}

function getSalesData() {
    $.ajax({
        url: "http://localhost:3000/sales",
        success: function (result) {
           
            salesData = result;
            retrieveSalesIndexFilters(salesData)

            //let filteredSales = filterByDateTime("2019-06-07", "12")
            //console.log(result)
            //console.log(filteredSales)
            //renderTable(filteredSales);
            renderSalesTable();
            
        },
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    });
}

function getSpeciesData() {
    $.ajax({
        url: "http://localhost:3000/species_sales",
        success: function (result) {
            console.log("pasok")
            $("#loadingMessage").html("");
            speciesData = result;     
            renderSpeciesTable();    
            
            let data = [];

            let labels = [];
            for(let key in result) {
                labels.push(key)
                data.push(result[key])
            }

            renderSpecChart(data, labels);
        },
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    });
}

function getBurgerData() {
    $.ajax({
        url: "http://localhost:3000/burger_sales",
        success: function (result) {
            burgerData = result
            renderBurgerTable()

            var data = [];
            data.push(result["Krusty Combo"]);
            data.push(result["Krusty Deluxe"]);
            data.push(result["Krabby Pattie"]);

            let labels = [];
            for(let key in result) {
                labels.push(key)
            }

            renderBurgChart(data, labels);
        },
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    });
}

function getBurgerSpeciesData() {
    $.ajax({
        url: "http://localhost:3000/burger_by_species",
        success: function (result) {
            burgerSpeciesData = result

            renderBurgerSpeciesTable("Krusty Combo")
            renderBurgerSpeciesTable("Krusty Deluxe")
            renderBurgerSpeciesTable("Krabby Pattie")
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

function renderSpecChart(dataset, label) {
    console.log("oof")
    var ctx = document.getElementById("specChart").getContext('2d');
    console.log("pare")
    console.log(label)
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'customer species per sale',
                    data: dataset,
                    borderColor: ['rgba(75, 192, 192, 1)', 
                        'rgba(192, 192, 192, 1)', 
                        'rgba(192, 192, 192, 1)'],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)',
                        'rgba(192, 192, 192, 0.2)',
                        'rgba(192, 192, 192, 0.2)'],
                    borderWidth: 0
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        }
    });
}

function renderBurgChart(dataset, label) {
    console.log("oof")
    var ctx = document.getElementById("burgChart").getContext('2d');
    console.log("pare")
    console.log(label)
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [
                {
                    label: '# of sales',
                    data: dataset,
                    borderColor: ['rgba(75, 192, 192, 1)', 
                        'rgba(192, 192, 192, 1)', 
                        'rgba(192, 192, 192, 1)'],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)',
                        'rgba(192, 192, 192, 0.2)',
                        'rgba(192, 192, 192, 0.2)'],
                    borderWidth: 0
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                        // callback: function (value, index, values) {
                        //     // return float2dollar(value);
                        // }
                    }
                }]
            },
        }
    });
}

/*
x-axis = datetime

each bar is the number of sales per day
stuff is counted based on datetime

*/


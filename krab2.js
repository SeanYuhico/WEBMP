let datesList=[];
let dateTimeList=[];
let timeList = []
let dayIndexes = []
let bilang = []
let salesData = []
let burgerSpeciesData = []
let burgerData = []
let speciesData = []
let salesTable
let myChart


$("#basicDate").flatpickr({
    // enableTime: true,
    dateFormat: "Y-m-d" /*H:i"*/
});

$("#timePicker").flatpickr({
    enableTime: true,
    noCalendar: true,
    time_24hr: true,
    dateFormat: "H:i",
});

function logout() {
    window.open('kkrabLogin.html', '_self');
}

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

function renderSalesTable() {
    console.log("sales data: " + salesData)
    console.log("eyyy")
    data = salesData
    if (salesTable !== undefined) {
        salesTable.clear()
        salesTable.rows.add(data)
    } else {
    salesTable = $('#myTable').DataTable({
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
}

function renderFilteredSalesTable(filtered) {
    console.log("sales data: " + salesData)
    console.log("filtered data: " + filtered)
    console.log("eyyy")

    
    data = filtered
    if (salesTable !== undefined) {
        console.log("Woh")
        
        salesTable.rows.add(filtered).draw()
    } else {
        salesTable = $('#myTable').DataTable({
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
            renderSalesChart(datesList, bilang)
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

            let labels = [];
            for( key in result["Krusty Combo"]) {
                labels.push(key)
            }

            

            renderBurgerSpecChart(labels, "Krusty Combo")
            renderBurgerSpecChart(labels, "Krusty Deluxe")
            renderBurgerSpecChart(labels, "Krabby Pattie")

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

let hourArray = []
function filterSales() {
    console.log($("#basicDate").val())
    salesTable.clear().draw()
    let byDate = filterByDate($("#basicDate").val());

    
    renderFilteredSalesTable(byDate)

    hourLabels = []

    for (let i = 0; i < 24; i++) {
        let n = i.toString() + ":00"
        n = n.toLocaleString('en', {minimumIntegerDigits:2,minimumFractionDigits:2,useGrouping:false})
        hourLabels.push(n)
    }

    
    renderFilteredSalesChart(hourLabels, hourArray)
}


function renderFilteredSalesChart(label, count) { //temporary lang yung pag pass ng count dito sa chart for checking purposes only kung gagana
    console.log($("#basicDate").val())
    console.log("oof")
    let ctx = document.getElementById("myChart").getContext('2d');
    console.log("pare")
    console.log(count)
    if (myChart !== undefined)
        myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Sales per hour',
                    data: count,
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

function filterByDate(dateInput){
    let filteredSales = [];
    let dateIndex = -1;
    hourArray = []

    for (let i = 0; i < 24; i++) {
        hourArray.push(0)
    }

    // get the index of the date
    for(let i=0;i<datesList.length;i++){
        console.log
        if(datesList[i] === dateInput){
            dateIndex = i;
            break;
        }
    }

    console.log("index: " + dateIndex)

    // push all sales under that day
    for (k in dayIndexes[dateIndex]) {
        console.log("um k: " + k)
        console.log(salesData[k])
        filteredSales.push(salesData[k])
    }

    for (let i = 0; i < timeList[dateIndex].length; i++) {
        let val = parseInt(timeList[dateIndex][i].substring(0, 2))
        hourArray[val]++
        console.log("now " + hourArray[val])
    }
    console.log(filteredSales)
    return filteredSales
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

function renderSalesChart(label, count) { //temporary lang yung pag pass ng count dito sa chart for checking purposes only kung gagana
    console.log($("#basicDate").val())
    console.log("oof")
    let ctx = document.getElementById("myChart").getContext('2d');
    console.log("pare")
    console.log(count)
    if (myChart !== undefined)
        myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Sales per day',
                    data: count,
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

function renderBurgerSpecChart(label, index) {
    console.log("eyyy")
    console.log(burgerSpeciesData)
    console.log(burgerSpeciesData[index]["sea lion"])
    let data = burgerSpeciesData[index]
    let num
    if (index === "Krusty Combo")
        num = "0"
    else if (index === "Krusty Deluxe")
        num = "1"
    else if (index === "Krabby Pattie")
        num = "2"
    let newArray = []

    for(key in data){
        newArray.push(burgerSpeciesData[index][key])
    }
    console.log(newArray)
    var ctx = document.getElementById("burgSpecChart" + num).getContext('2d');
    // console.log(data)
    // dataTable = $('#burgSpecTable' + num).DataTable({
    //     "bLengthChange": false,
    //     "bFilter": true,
    //     "bInfo": false,
    //     bPaginate: false,
    //     data: data,
    //     "searching": false,
    //     columns: [
    //         { data: "leatherback turtle", title: "Leatherback Turtle"},
    //         { data: "salmon", title: "Salmon"},
    //         { data: "seahorse", title: "Seahorse"},
    //         { data: "coral", title: "Coral"},
    //         { data: "giant clam", title: "Giant Clam"},
    //         { data: "gray whale", title: "Gray Whale"},
    //         { data: "sea lion", title: "Sea Lion"}
    //       ]
    //   });
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Burger Order Per Species',
                    data: newArray,
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

// function renderBurgSpecChart0(dataset, label) {
//     console.log("oof")
//     var ctx = document.getElementById("burgSpecChart0").getContext('2d');
//     console.log("pare")
//     console.log(label)
//     var myChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: label,
//             datasets: [
//                 {
//                     label: 'customer species per sale',
//                     data: dataset,
//                     borderColor: ['rgba(75, 192, 192, 1)', 
//                         'rgba(192, 192, 192, 1)', 
//                         'rgba(192, 192, 192, 1)'],
//                     backgroundColor: ['rgba(75, 192, 192, 0.2)',
//                         'rgba(192, 192, 192, 0.2)',
//                         'rgba(192, 192, 192, 0.2)'],
//                     borderWidth: 0
//                 }
//             ]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             },
//         }
//     });
// }
// function renderBurgSpecChart1(dataset, label) {
//     console.log("oof")
//     var ctx = document.getElementById("burgSpecChart1").getContext('2d');
//     console.log("pare")
//     console.log(label)
//     var myChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: label,
//             datasets: [
//                 {
//                     label: 'customer species per sale',
//                     data: dataset,
//                     borderColor: ['rgba(75, 192, 192, 1)', 
//                         'rgba(192, 192, 192, 1)', 
//                         'rgba(192, 192, 192, 1)'],
//                     backgroundColor: ['rgba(75, 192, 192, 0.2)',
//                         'rgba(192, 192, 192, 0.2)',
//                         'rgba(192, 192, 192, 0.2)'],
//                     borderWidth: 0
//                 }
//             ]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             },
//         }
//     });
// }
// function renderBurgSpecChart2(dataset, label) {
//     console.log("oof")
//     var ctx = document.getElementById("burgSpecChart2").getContext('2d');
//     console.log("pare")
//     console.log(label)
//     var myChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: label,
//             datasets: [
//                 {
//                     label: 'customer species per sale',
//                     data: dataset,
//                     borderColor: ['rgba(75, 192, 192, 1)', 
//                         'rgba(192, 192, 192, 1)', 
//                         'rgba(192, 192, 192, 1)'],
//                     backgroundColor: ['rgba(75, 192, 192, 0.2)',
//                         'rgba(192, 192, 192, 0.2)',
//                         'rgba(192, 192, 192, 0.2)'],
//                     borderWidth: 0
//                 }
//             ]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             },
//         }
//     });
// }

/*
x-axis = datetime

each bar is the number of sales per day
stuff is counted based on datetime

*/


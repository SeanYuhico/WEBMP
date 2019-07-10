// const flatpickr = require("flatpickr");


/*
$.ajax({
        url: "http://localhost:3000/sales",
        success: function (result) {
            console.log("pasok")
            $("#loadingMessage").html("");
            var data = [];
            
            le

            let labels = [];
            for(let key in result) {
                for (let key in result[key]) {
                    
                }
            }

            //renderChart(data, labels);
        },
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    });
*/

// $(".selector").flatpickr(optional_config);

$("#basicDate").flatpickr({
    // enableTime: true,
    dateFormat: "Y-m-d" /*H:i"*/
});

// $("#rangeDate").flatpickr({
//     mode: 'range',
//     dateFormat: "Y-m-d"
// });

$("#timePicker").flatpickr({
    enableTime: true,
    noCalendar: true,
    time_24hr: true,
    dateFormat: "H:i",
});

// $(".resetDate").flatpickr({
//     wrap: true,
//     weekNumbers: true,
// });

function float2dollar(value) {
    return "U$ " + (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// function renderChart(dateList, count, time) { //temporary lang yung pag pass ng count dito sa chart for checking purposes only kung gagana
//     console.log($("#basicDate").val())
//     console.log("oof")
//     var ctx = document.getElementById("myChart").getContext('2d');
//     console.log("pare")
//     console.log(count)
//     var myChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: dateList,
//             datasets: [
//                 {
//                     label: 'sales per date',
//                     data: count,
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
function renderChart(label, count, time) { //temporary lang yung pag pass ng count dito sa chart for checking purposes only kung gagana
    console.log($("#basicDate").val())
    console.log("oof")
    var ctx = document.getElementById("myChart").getContext('2d');
    console.log("pare")
    console.log(count)
    var myChart = new Chart(ctx, {
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

// global variables
let datesList=[];
let dateTimeList=[];
let timeList = []
let dayIndexes = []
let bilang = []
let data = []

function getChartData() {
    $.ajax({
        url: "http://localhost:3000/sales",
        success: function (result) {
            console.log("pasok")
            $("#loadingMessage").html("");
            data = [];
            // let dateTime=[], burger=[], species=[]
            // console.log(result)
            data = result;
            retrieveSalesIndexFilters(result)

            console.log($("#basicDate").val())

            //let byDate = filterByDate(result, $("#basicDate").val());
            
            let filteredSales = filterByDate("2019-06-07")
            console.log(result)
            console.log(filteredSales)

            hourLabels = []

            for (let i = 0; i < 24; i++) {
                let n = i.toString() + ":00"
                n = n.toLocaleString('en', {minimumIntegerDigits:2,minimumFractionDigits:2,useGrouping:false})
                hourLabels.push(n)
            }

            console.log(hourLabels)

            //dayCount is a 2D array of indexes per date use .length to get the display number
            //datesList is a list of all the unique formatted dates for labelling

            renderChart(datesList, bilang, timeList);
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

    // get the index of the date
    for(let i=0;i<datesList.length;i++){
        if(datesList[i] === dateInput){
            dateIndex = i;
            break;
        }
    }

    // push all sales under that day
    for (k in dayIndexes[dateIndex]) {
        filteredSales.push(data[k])
    }

    let hourArray = []
    for (let i = 0; i < 24; i++) {
        hourArray.push(0)
    }
    
    for (let i = 0; i < timeList[dateIndex].length; i++) {
        let val = parseInt(timeList[dateIndex][i].substring(0, 2))
        hourArray[val]++
        console.log("now " + hourArray[val])
    }

    return hourArray;
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


$("#renderBtn").click(
    function () {
        getChartData();
    }
);

//
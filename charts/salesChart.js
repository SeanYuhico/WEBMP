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
    dateFormat: "F, d Y" /*H:i"*/
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

function renderChart(dateList, count, time) { //temporary lang yung pag pass ng count dito sa chart for checking purposes only kung gagana
    console.log($("#basicDate").val())
    console.log("oof")
    var ctx = document.getElementById("myChart").getContext('2d');
    console.log("pare")
    console.log(count)
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dateList,
            datasets: [
                {
                    label: 'sales per date',
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

function getChartData() {
    $.ajax({
        url: "http://localhost:3000/sales",
        success: function (result) {
            console.log("pasok")
            $("#loadingMessage").html("");
            let data = [];
            // let dateTime=[], burger=[], species=[]
            // console.log(result)
            let byDate = filterByDate(result, $("#basicDate").val());
            let labels = [];
            let datesList=[];
            let dateTimeList=[];
            let tempDate = "2011-07-14"
            let timeList = []
            let dayCount = []
            let bilang = []
            for(let key in result) {

                /*
                we make a array
                array will contain all dates 
                First loop
                    to do this -> for every object, check the date
                    -> for every new date not in array, add to datelist
                    -> sort datelist by date lol
                Second loop
                    -> we loop filterbydate and input the stuff from datelist
                */
                let temp = result[key].datetime
                let formatted = temp.substring(0,10);
                tempDate = formatted;
                // console.log(temp)
                let tempDateTime = temp.substring(11,19);
                // console.log(formatted);
                // console.log(tempDateTime);
                if(datesList.length===0){
                    datesList.push(formatted);
                    dayCount.push(new Array())
                    dayCount[0].push(key)
                    timeList.push(new Array())
                    timeList[0].push(tempDateTime)
                    //dayCount[key]=1;//dayCount.push(1)
                    //substring(11,19);
                }
                else{
                    let isInList = false
                    for(let i=0;i<datesList.length;i++){
                        if(datesList[i] === tempDate){
                            dayCount[i].push(key)
                            timeList[i].push(tempDateTime)
                            isInList = true
                        }
                        
                    }

                    if (!isInList) {
                        datesList.push(formatted);
                        dayCount.push(new Array())
                        dayCount[dayCount.length - 1].push(key)
                        timeList.push(new Array())
                        timeList[timeList.length - 1].push(tempDateTime)
                    }
                }
                // timeList.push(tempDateTime)
                dateTimeList.push(temp);        
            }
            for(let i=0;i<dayCount.length;i++){
                bilang.push(dayCount[i].length)
            }
            console.log(datesList)
            console.log(dayCount)
            console.log(timeList)
            //dayCount is a 2D array of indexes per date use .length to get the display number
            //datesList is a list of all the unique formatted dates for labelling

            renderChart(datesList, bilang, timeList);
        },
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    });
}

function filterByDate(array, date){
    let filtered = [];
    filteredSalesCount = 0;
    for(let i = 0; i < array.length; i++){

        let obj = array[i];
        let strDatetime = obj.datetime;
        if (strDatetime.includes(date)) {
            filtered.push(obj)
        }
    }    
    filteredSalesCount = filtered.length;
    return filtered;
}

// function filterByDateTime(array, date, time){
//     var filtered = [];
//     filteredSalesCount = 0;
//     for(var i = 0; i < array.length; i++){

//         var obj = array[i];
//         let strDatetime = obj.datetime;
//         if (strDatetime.includes(date + " " + time)) {
//             filtered.push(obj)
//         }
//     }    
//     filteredSalesCount = filtered.length;
//     return filtered;
// }
/* 
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
*/
function filterByDateTime(dateInput, timeInput){
    let timeList = [];
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

    /*
        make an array of int sized 24 (0-23)
        hourArray
        solution 1: (loop and less efficient)
        if the timeList[dateIndex][i] matches an hour 
        -> (timeList[dateIndex][i].startsWith(<put time here>))
            add++ to the respective hour
        
        solution 2: (parsing and hour mapping) 
            get timeList[dateIndex][i] and get the hour lang
            make that an int hourIndex, then use it to index
            hourArray[hourIndex]++
    */
   return filteredSales;
}


$("#renderBtn").click(
    function () {
        getChartData();
    }
);

//
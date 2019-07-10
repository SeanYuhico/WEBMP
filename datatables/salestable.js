let datesList=[];
let dateTimeList=[];
let timeList = []
let dayIndexes = []
let bilang = []
let data = []

function float2dollar(value) {
    return "U$ " + (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function renderTable(result) {
    console.log("eyyy")
    let data = [result]
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

/*
sales per hour


*/

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
        getTableData();
    }
);
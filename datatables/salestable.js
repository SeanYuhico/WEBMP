let datesList=[];
let dateTimeList=[];
let timeList = []
let dayIndexes = []
let bilang = []

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

function getTableData() {
    $.ajax({
        url: "http://localhost:3000/sales",
        success: function (result) {
            console.log("pasok")
            $("#loadingMessage").html("");

            let tempDate = "2011-07-14"

            for(let key in result) {

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

            let dateIndex = -1;
            for(let i=0;i<datesList.length;i++){
                if(datesList[i] === tempDate){
                    dateIndex = i;
                    break;
                }
            }

            let filteredSales = [];
            for (k in dayIndexes[dateIndex]) {
                filteredSales.push(result[k])
            }
            




            console.log(result)
            console.log(filteredSales)
            renderTable(filteredSales);
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

function filterByDateTime(array, date, time){
    var filtered = [];
    filteredSalesCount = 0;
    for(var i = 0; i < array.length; i++){

        var obj = array[i];
        let strDatetime = obj.datetime;
        if (strDatetime.includes(date + " " + time)) {
            filtered.push(obj)
        }
    }    
    filteredSalesCount = filtered.length;
    return filtered;
}

$("#renderBtn").click(
    function () {
        getTableData();
    }
);
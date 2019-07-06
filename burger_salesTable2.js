function CreateTableFromJSON(dataset, labels) {
    var myOrders = [], myData = [];
    myOrders=labels
    myData=dataset
    console.log(myOrders)
    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myOrders.length; i++) {
        // for (var key in myOrders[i]) {
        //     // console.log(key)
        //     if (col.indexOf(key) == -1) {
        //         col.push(key);
        //     }
        //     console.log(col[i])
        // }
        if (col.indexOf(i) == -1) {
            col.push(myOrders[i]);
        }
        console.log(col[i])
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myData.length; i++) {

        tr = table.insertRow(-1);
        console.log(myData[i])
        var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myData[i];//[col[j]];
        // for (var j = 0; j < myData.length; j++) {
        //     var tabCell = tr.insertCell(-1);
        //     tabCell.innerHTML = myData[i];//[col[j]];
        // }

    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function getChartData() {
    $.ajax({
        url: "http://localhost:3000/burger_sales",
        success: function (result) {
            console.log("pasok")
            $("#loadingMessage").html("");
            var data = [];
            // console.log(result["Krusty Combo"])
            data.push(result["Krusty Combo"]);
            data.push(result["Krusty Deluxe"]);
            data.push(result["Krabby Pattie"]);

            let labels = [];
            for(let key in result) {
                labels.push(key)
            }

            CreateTableFromJSON(data, labels);
        },
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    });
}
$("#loadTable").click(
    function () {
        getChartData();
    }
);
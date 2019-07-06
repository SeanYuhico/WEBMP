var dataToTable = function (dataset, labels) {
    var html = '<table>';
    html += '<thead><tr><th style="width:120px;">#</th>';
    var information=[], headerLabel=[]
    information=dataset;
    headerLabel=labels;
    console.log(information)
    console.log(headerLabel)
    var columnCount = 0;
    $.each(information, function (idx, item) {
        html += '<th>' + item + '</th>';
        console.log(item)
        columnCount += 1;
        // console.log(columnCount)
    });

    html += '</tr></thead>';

    $.each(headerLabel, function (idx, item) {
        html += '<tr><td>' + item + '</td>';
        for (i = 0; i < columnCount; i++) {
            console.log(information[i])
            html += '<td>' + (information[i] === '0' ? '-' : information[i]) + '</td>';
        }
        html += '</tr>';
    });

    html += '</tr><tbody></table>';

    return html;
};

// var data = {
//     labels: ["January"],//, "February", "March", "April", "May", "June", "July"], //rows
//     datasets: [ //columns
//         {
//             label: "My First dataset",
//             // fillColor: "rgba(220,220,220,0.2)",
//             // strokeColor: "rgba(220,220,220,1)",
//             // pointColor: "rgba(220,220,220,1)",
//             // pointStrokeColor: "#fff",
//             // pointHighlightFill: "#fff",
//             // pointHighlightStroke: "rgba(220,220,220,1)",
//             data: [2304]
//         },
//         {
//             label: "My Second dataset",
//             // fillColor: "rgba(151,187,205,0.2)",
//             // strokeColor: "rgba(151,187,205,1)",
//             // pointColor: "rgba(151,187,205,1)",
//             // pointStrokeColor: "#fff",
//             // pointHighlightFill: "#fff",
//             // pointHighlightStroke: "rgba(151,187,205,1)",
//             data: [1522]
//         },
//         {
//             label: "My Third dataset",
//             // fillColor: "rgba(55,187,205,0.2)",
//             // strokeColor: "rgba(55,187,205,1)",
//             // pointColor: "rgba(55,187,205,1)",
//             // pointStrokeColor: "#fff",
//             // pointHighlightFill: "#fff",
//             // pointHighlightStroke: "rgba(151,187,205,1)",
//             data: [6174]
//         }
//     ]
// };

function getChartData() {
    var html
    $.ajax({
        url: "http://localhost:3000/burger_sales",
        success: function (result) {
            // console.log("pasok")
            $("#loadingMessage").html("");
            var data = [];
            // console.log(result["Krusty Combo"])
            data.push(result["Krusty Combo"]);
            data.push(result["Krusty Deluxe"]);
            data.push(result["Krabby Pattie"]);
            // console.log(data.datasets[0].data)

            let labels = [];
            for(let key in result) {
                labels.push(key)
            }

        html = dataToTable(data, labels);
        console.log(html)
        },
        error: function (err) {
            $("#loadingMessage").html("Error");
        }    
    });
    return html
}

$('#wrapper').html(getChartData());
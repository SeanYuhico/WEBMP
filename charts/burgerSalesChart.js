function float2dollar(value) {
    return "U$ " + (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function renderChart(dataset, label) {
    console.log("oof")
    var ctx = document.getElementById("myChart").getContext('2d');
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

            renderChart(data, labels);
        },
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    });
}

$("#renderBtn").click(
    function () {
        getChartData();
    }
);
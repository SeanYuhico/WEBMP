function float2dollar(value) {
    return "U$ " + (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function renderChart(data, labels) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Krusty Combo',
                    data: data[0],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'Krusty Deluxe',
                    data: data[1],
                    borderColor: 'rgba(192, 192, 192, 1)',
                    backgroundColor: 'rgba(192, 192, 192, 0.2)',
                },
                {
                    label: 'Krabby Pattie',
                    data: data[2],
                    borderColor: 'rgba(192, 192, 192, 1)',
                    backgroundColor: 'rgba(192, 192, 192, 0.2)',
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

function getChartData() {
    $.ajax({
        url: "http://localhost:3000/burger_sales",
        success: function (result) {
            $("#loadingMessage").html("");
            var data = [];
            // console.log(result["Krusty Combo"])
            data.push(result["Krusty Combo"]);
            data.push(result["Krusty Deluxe"]);
            data.push(result["Krabby Pattie"]);
            var labels = result.burger_sales;
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
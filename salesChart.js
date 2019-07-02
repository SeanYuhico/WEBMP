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

function getChartData() {
    $.ajax({
        url: "http://localhost:3000/sales",
        success: function (result) {
            console.log("pasok")
            $("#loadingMessage").html("");
            let data = [];
            

            let labels = [];
            for(let key in result) {
                for (let k in result[key]) {
                    
                }
            }

            //renderChart(data, labels);
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
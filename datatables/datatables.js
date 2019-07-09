let dataTable;

function float2dollar(value) {
    return "U$ " + (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function renderTable(result) {
    console.log("eyyy")
    let data = [result]
    
    dataTable = $('#myTable').DataTable({
        data: data,
        "searching": false,
        columns: [
            { data: "Krusty Combo", title: "Krusty Combo"},
            { data: "Krusty Deluxe", title: "Krusty Deluxe"},
            { data: "Krabby Pattie", title: "Krabby Pattie"}
          ]
      });
}

function getTableData() {
    $.ajax({
        url: "http://localhost:3000/burger_sales",
        success: function (result) {
            console.log("pasok")
            $("#loadingMessage").html("");

            console.log(result)
            console.log(result["Krusty Combo"])

            
            console.log("um")
            renderTable(result);
        },
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    });
}

$("#renderBtn").click(
    function () {
        getTableData();
    }
);
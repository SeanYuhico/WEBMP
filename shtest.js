// function loadData(){
//     d3.json("krustykrab.json", function(data){
//         console.log()
//         var canvas = d3.select(".")
//     })
// }
let burgSales, specSales, burgSpec; //kPattie, kDeLuxe;
let date = "2019-05-27 12:00:00";
let filteredSalesCount = 0;
$(document).ready(function(){
    // $.getJSON("krustykrab.json",function(data){
    //     burgSales = JSON.parse(data)
    //     console.log(data)
    // });
    // burgSales = JSON.parse("krustykrabarray.json")
    // console.log(burgSales)
    /*
    $.ajax({
        url: "krustykrabarray.json",
        dataType: "json",
        type: "get",
        cache: false,
        success: function(data){
            $(data).each(function(index, value){ //$(data.species_sales) is the specific object
                console.log(data)
                // console.log(burgSales)
                //burgSales = data.burger_sales
                //specSales = data.species_sales
                //burgSpec = data.burger_by_species
                // kPattie = data.burger_sales
                //console.log(data.burger_sales);
                //console.log(specSales);
                //console.log(burgSpec);
            });
        }
    });
    */
    d3.json("krustykrab_array.json").then(data => {
        console.log(data);
        burgSales = data.burger_sales;
        console.log(burgSales)
        let sales = data.sales;

        /*let arr1 = sales.filter(d => {
            d.datetime === "2019-05-27 12:00:00";
        })
        console.log(arr1);*/
        console.log(sales[0])
        //console.log(sales.filter(checkDate));
        //var byName = filterByProperty(arr, "name", "Fran");
        var byDate = filterByDate(sales, "2019-06-07", "08");
        console.log(byDate);
        console.log(filteredSalesCount)
        console.log("-------------------")
    })
});

function filterByDate(array, date, time){
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
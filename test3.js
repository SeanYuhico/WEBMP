// function loadData(){
//     d3.json("krustykrab.json", function(data){
//         console.log()
//         var canvas = d3.select(".")
//     })
// }
let burgSales, specSales, burgSpec; //kPattie, kDeLuxe;
    
$(document).ready(function(){
    // $.getJSON("krustykrab.json",function(data){
    //     burgSales = JSON.parse(data)
    //     console.log(data)
    // });
    // burgSales = JSON.parse("krustykrabarray.json")
    // console.log(burgSales)
    $.ajax({
        url: "krustykrab.json",
        dataType: "json",
        type: "get",
        cache: false,
        success: function(data){
            $(data).each(function(index, value){ //$(data.species_sales) is the specific object
                console.log(data)
                // console.log(burgSales)
                burgSales = data.burger_sales
                specSales = data.species_sales
                burgSpec = data.burger_by_species
                // kPattie = data.burger_sales
                console.log(data.burger_sales);
                console.log(specSales);
                console.log(burgSpec);
            });
        }
    });
});

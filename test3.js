// function loadData(){
//     d3.json("krustykrab.json", function(data){
//         console.log()
//         var canvas = d3.select(".")
//     })
// }
$(document).ready(function(){
    // $.getJSON("krustykrab.json",function(data){
    //     console.log(data)
    // });

    $.ajax({
        url: "krustykrab.json",
        dataType: "json",
        type: "get",
        cache: false,
        success: function(data){
            $(data.species_sales).each(function(index, value){
                console.log(value)
            })
        }
    })
});

function fetchData(categories)
{
    // alert(categories);
    // var data = {
    //     'categories': categories
    // };
    $.ajax({
        type: "GET",
        url: "/update_home/"+categories,
        // data: data,
        // cache: true,
        success: function(data){
        //    $("#resultarea").text(data);
        // alert('hello');
        console.log(data);
        $('#main-contents').html(data);
        }
        });
}
$(document).ajaxStart(function() {
    // alert('Ajax start');
    $('#loading').show(); // show the gif image when ajax starts
}).ajaxStop(function() {
        $('#loading').hide(); // hide the gif image when ajax completes
});

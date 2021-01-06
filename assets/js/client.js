function addtocart(image_id,category,user_id)
{
    // alert(image_id+category+user_id);
    $.ajax({
        type: "GET",
        url: "/client/update_client/"+image_id+'/'+category+'/'+user_id,
        // data: data,
        // cache: true,
        success: function(data){
        //    $("#resultarea").text(data);
        // alert('hello');
        console.log(data);
        $('header').html(data);
        }
        });
}
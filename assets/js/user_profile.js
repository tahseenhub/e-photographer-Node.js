function clickEdit()
{
    $.ajax({
            type: "GET",
            url: "/user/ajax_edit/",
            // data: data,
            // cache: true,
            success: function(data){
            //    $("#resultarea").text(data);
            // alert('hello');
            // console.log("ajax file"+data);
            $('#main-contents').html(data);
            
        }
        });
}
function clickPhotos()
{
    $.ajax({
            type: "GET",
            url: "/user/ajax_photos/",
            // data: data,
            // cache: true,
            success: function(data){
            //    $("#resultarea").text(data);
            // alert('hello');
            // console.log("ajax file"+data);
            $('#main-contents').html(data);
            
        }
        });
}
function clickOverview()
{
    $.ajax({
            type: "GET",
            url: "/user/ajax_overview/",
            // data: data,
            // cache: true,
            success: function(data){
            //    $("#resultarea").text(data);
            // alert('hello');
            // console.log("ajax file"+data);
            $('#main-contents').html(data);
            
        }
        });
}
function clickEvents()
{
    $.ajax({
            type: "GET",
            url: "/user/ajax_events/",
            // data: data,
            // cache: true,
            success: function(data){
            //    $("#resultarea").text(data);
            // alert('hello');
            // console.log("ajax file"+data);
            $('#main-contents').html(data);
            
        }
        });
}
function clickProjects()
{
    $.ajax({
            type: "GET",
            url: "/user/ajax_projects/",
            // data: data,
            // cache: true,
            success: function(data){
            //    $("#resultarea").text(data);
            // alert('hello');
            // console.log("ajax file"+data);
            $('#main-contents').html(data);
            
        }
        });
}
function update_profile()
{
    var data={
         name: $("input[name=name]").val(),
        username: $("input[name=username]").val(),
        tagline: $("input[name=tagline]").val(),
        email: $("input[name=email]").val(),
        tagline: $("input[name=tagline]").val(),
        facebook: $("input[name=facebook]").val(),
        instagram: $("input[name=instagram]").val(),
    }
//    var name= $("input[name=name]").val();
//    var username= $("input[name=username]").val();
//    var tagline= $("input[name=tagline]").val();
//    var email= $("input[name=email]").val();
//    var tagline= $("input[name=tagline]").val();
//    var facebook= $("input[name=facebook]").val();
//    var instagram= $("input[name=instagram]").val();
//    alert(name+' '+username+' '+tagline+' '+email+' '+tagline+' '+facebook+' '+instagram);
// alert(data.email);
    $.ajax({
        type: "POST",
        url: "/user/ajax_update/",
        data: data,
        // cache: true,
        success: function(data){
        //    $("#resultarea").text(data);
        // alert('hello');
        console.log("ajax file"+data);
        // $('#main-contents').html(data);
    }
    });
}
$(document).ajaxStart(function() {
    // alert('Ajax start');
    $('#loading').show(); // show the gif image when ajax starts
}).ajaxStop(function() {
        $('#loading').hide(); // hide the gif image when ajax completes
});

function mymodal()
{
    // alert('hello');
    var modal=document.getElementById('id01');
    document.getElementById('id01').style.display='block';

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
}
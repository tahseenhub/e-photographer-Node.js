function checkunique(column,str)
{
    // alert(str);
    // alert(column)
    if(str=="")
        {
            str="hello";
        }
    $.ajax({
        type: "GET",
        
        url: "/signup/updated_signup/"+str+"/"+column,
        data: {column},
        
        // cache: true,
        
        success: function(data){
        //    $("#resultarea").text(data);
        // alert('hello');
        // console.log(data);
        
        if(str=="")
        {
            $('.error').css('display','none');
        }else if(data!=""){
            
            $('.error').html(data);
            $('.error').css('display','block');
        }
        // $('.error').html(data);
        
        }
        });
}
var express=require('express');
var image = require.main.require('./models/image-model');
var user = require.main.require('./models/user_model');
var router=express.Router();

router.get('/', function(req,res){
    // alert('hello');
    if(req.session.user_login!=true)
    {
        res.redirect('./home');
    }else{
        user_info={
            id:req.session.data.id,
            name:req.session.data.name,
            username:req.session.data.username,
            email:req.session.data.email,
            img:req.session.data.img,
            password:req.session.data.password,
            tagline:req.session.data.tagline,
            facebook:req.session.data.facebook,
            instagram:req.session.data.instagram,
            type:req.session.data.type,
        }
        // console.log(user_info);
        image.getRecommendPhotos(function(results){
            if(user_info.type=="photographer"){
                res.render('./user/user_home',{all_image:results,user_info,category:'recommend_photos'});
            }
            else if(user_info.type=="client"){
                // res.render('./user/client_home',{all_image:results,user_info,category:'recommend_photos'});
                res.redirect('./client')
            }else if(user_info.type=="admin"){
                // res.render('./user/client_home',{all_image:results,user_info,category:'recommend_photos'});
                res.redirect('./admin')
            }
            
        })
    }
    
    
    // console.log(user_info);
});
router.post('/',function(req,res){	
    // return res.render('./user/ajax_edit');
    // console.log(req.body);
    // console.log("id",user_info.email);
    var data={
        category:req.body.category,
        img:req.body.img,
        description:req.body.description,
    }
    var g=[];
    image.insertPhotosCategory(user_info.id,data, function(status){
        image.getImageId(data,function(results){
            image.insertAllImage(results[0].id,user_info.id,data, function(status){
                image.getAllFrom_all_photo(user_info.id, function(results){
                    for(var i=0; i<results.length; i++){
                        image.getImageById(results[i].photo_id,results[i].category, function(results){
                            g.push(results);
                        })
                    }
                })
                setTimeout(function(){
                res.render('./user/user_profile',{all_image: g});
        
                },10);
            });
        });
    });

});
router.post('/update',function(req,res){	
    // return res.render('./user/ajax_edit');
    res.send('hello')
});

router.get('/profile', function(req, res){
    if(req.session.user_login!=true)
    {
        res.redirect('/home');
    }else{
        var g=[];

        // var user_id=result[0].id;
        // console.log(user_info.id);
        
        image.getAllFrom_all_photo(user_info.id, function(results){
            // console.log(results);
            for(var i=0; i<results.length; i++){
                // console.log("hello"+results[i].category);
                image.getImageById(results[i].photo_id,results[i].category, function(results){
                    // console.log("final", results);
                    // console.log("final",results[i].id);
                    g.push(results);
                    // g[i]=results[0];
                    // console.log('gggg', g);
                })
            }
            // image.getImageById(user_info.id,results[0].photo_id,results[0].category, function(results){})
            // console.log("main array",g)
        })
        setTimeout(function(){
        res.render('./user/user_profile',{all_image: g});

        },10);
    }
});
router.get('/ajax_edit/',function(req,res){	
    return res.render('./user/ajax_edit');	
});
router.get('/ajax_photos/',function(req,res){	
    return res.render('./user/ajax_photos');	
});
router.get('/ajax_overview/',function(req,res){	
    return res.render('./user/ajax_overview');	
});
router.get('/ajax_events/',function(req,res){	
    return res.render('./user/ajax_events');	
});
router.get('/ajax_projects/',function(req,res){	
    return res.render('./user/ajax_projects');	
});

router.post('/ajax_update/',function(req,res){	
    // return res.render('./user/ajax_edit');
    // console.log('controller hello',updated_data.email);
    // console.log('email',req.body.tagline);
    // alert('hello');
    user.update_user_info(req.body, function(status){
        if(status){
            req.session.new={
                name:req.body.name,
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                tagline:req.body.tagline,
                facebook:req.body.facebook,
                instagram:req.body.instagram,
            }
            user_info={
                name:req.session.new.name,
                username:req.session.new.username,
                email:req.session.data.email,
                img:req.session.data.img,
                password:req.session.data.password,
                tagline:req.session.new.tagline,
                facebook:req.session.new.facebook,
                instagram:req.session.new.instagram,
                type:req.session.data.type,
            }
        // console.log("ajax file");

            return res.render('./user/ajax_edit');
        }
    })
});
router.post('/feedback/',function(req,res){	
    // console.log('feedback',req.body);
    var data={
        email:req.body.email,
        feedback:req.body.feedback
    }
    user.insertFeedback(data, function(status){
        if(status){
            if(req.session.user_login==true)
            {
                res.redirect('/user');
            }else{
                res.redirect('../home');
            }
        }else{
            res.send('don\'t');
        }    
    })
    
});

module.exports=router;
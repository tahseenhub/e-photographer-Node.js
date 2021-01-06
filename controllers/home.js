var express=require('express');
var image = require.main.require('./models/image-model');
var user = require.main.require('./models/user_model');
var router=express.Router();

router.get('/',function(req,res){
    image.getRecommendPhotos(function(results){

		if(results != null){
			res.render('./home/home', {all_image: results,category:'recommend_photos'});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});
router.get('/home',function(req,res){
    image.getRecommendPhotos(function(results){
		if(results != null){
            // console.log("home",results);

			return res.render('./home/home', {all_image: results,category:'recommend_photos'});		
		}else{
			res.send('Error!.. try again...');
		}
	});
});
router.get('/update_home/:category',function(req,res){
    image.getCategory(req.params.category, function(results){
		if(results != null){
			return res.render('./home/updated_contents', {all_image: results,category:req.params.category});		
		}else{
			res.send('Error!.. try again...');
		}
	});
});
router.get('/home/signinCheck', function(req,res){
    res.redirect('/signin');  
});

router.get('/image_details/:id/:category',function(req,res){
    // image.getImageById(req.params.id, function(result){
    image.getImageById(req.params.id, req.params.category, function(result){
        if(result != null){
            image.getCategory(req.params.category, function(results){
				// console.log("result",result);
				user.geBytId(result[0].user_id, function(photo_owner){
					// console.log(results);
					res.render('./home/img_details', {image:result,all_image:results,category:req.params.category,owner_info:photo_owner});
				})
            })
        }else{
            res.render('/home')
        }
    });
});
router.get('/image_details/',function(req,res){
    res.redirect('/home');  
});


module.exports=router;
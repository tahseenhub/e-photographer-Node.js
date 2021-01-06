var express=require('express');
var user = require.main.require('./models/user_model');
var router=express.Router();

router.get('/', function(req,res){
    data={
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        img:req.body.img,
    }
    res.render('./signup/signup', {data:data});
});
router.get('/updated_signup/:str/:column',function(req,res){
    // console.log(req.params);
    user.checkUnique(req.params.str,req.params.column, function(results){
        // console.log(results.length);
		if(results.length > 0){
        // console.log(req.params.str);
        // console.log("results: ",results)
			return res.render('./signup/updated_contents', {str: "1"});	
		}else{
			return res.render('./signup/updated_contents', {str: "2"});	
        }
	});
});
router.get('/hire', function(req,res){
    data={
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        img:req.body.img,
    }
    res.render('./signup/signup_hire', {data:data});
});
router.post('/', function(req,res){
    data={
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        img:req.body.img,
        type:req.body.type,
    }
    
    // console.log('username: '+req.session.data.username);
    req.checkBody('username', '*Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');
    req.checkBody('email','*Enter a valid email').isEmail().normalizeEmail();
    req.checkBody('password', '*Password must be between 5-60 characters long.').len(5, 60);
    req.checkBody("password", "*Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    const err=req.validationErrors();

    if(err){
        res.render('./signup/signup',{errors:err,data:data});
    }else{
        user.insertUser(data, function(status){
            if(status){
                // res.send('success')
                req.session.user_login=true;
                user.getExtra(data.email, function(results){
                    req.session.data={
                        id:results[0].id,
                        name:req.body.name,
                        username:req.body.username,
                        email:req.body.email,
                        password:req.body.password,
                        img:req.body.img,
                        tagline:results[0].tagline,
                        facebook:results[0].facebook,
                        instagram:results[0].instagram,
                        type:req.body.type,
                    }
                    res.redirect('./user');

                })
            }else{
                res.send('don\'t');
            }    
        })
    }
});
router.post('/hire', function(req,res){
    data={
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        img:req.body.img,
    }
    req.checkBody('name','Name cann\'t be empty').notEmpty();
    const err=req.validationErrors();

    if(err){
        res.render('./signup/signup_hire',{errors:err,data:data});
    }
});

module.exports=router;
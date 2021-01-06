var express=require('express');
var user = require.main.require('./models/user_model');
var router=express.Router();

router.get('/', function(req,res){
    res.render('./signin/signin');
});
router.post('/', function(req,res){
    var data = {
		email: req.body.email,
		password: req.body.password,
	};
	user.validate(data, function(status){
		if(status){
            // console.log(req.session.email);
            user.getAll(req.body.email,function(results){
            req.session.user_login=true;
            req.session.data = results[0];
                // console.log("email: ",req.session.data);
                res.redirect('./user');
			    // res.render('./user/user_home',{user_info:results[0]});
            });
		}else{
			res.send('invalid username/password...');
		}
	});
    console.log(req.body.email);
});

module.exports=router;
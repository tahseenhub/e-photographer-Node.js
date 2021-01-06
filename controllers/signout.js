var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
    req.session.user_login=false;
    user_info={}
    res.redirect('./home');

});

module.exports=router;
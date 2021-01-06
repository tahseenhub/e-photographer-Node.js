var express=require('express');
var admin_model = require.main.require('./models/admin_model');
var router=express.Router();


router.get('/', function(req,res){
    admin_model.getAll(function(results){
		console.log(results);
		if(results != null){
			admin_model.getWeedingPhotos(function(results1){
				console.log(results1);
				if(results1 != null){
					res.render('./admin/admin_home', {results: results, results1: results1});
				}else{

				}
			});  
		}else{
			res.send('Error!.. try again...');
		}
	});
});




router.get('/activateUser/:id', function(req, res){
	// console.log('working for now');
	admin_model.activate(req.params.id, function(result){

		if(result != null){
			admin_model.getAll(function(results){
				if(results != null){
			  		console.log(results);
					res.render('./admin/admin_home', {results: results, results1: "null"});
				}else{
					res.send('Error!.. try again...');
				}
			});		
		}else{
			res.send('Error!.. try again...');
		}
	});
});

router.get('/deactivateUser/:id', function(req, res){
	// console.log('working for now');
	admin_model.deactivate(req.params.id, function(result){

		if(result != null){
			admin_model.getAll(function(results){
				if(results != null){
			  		console.log(results);
					res.render('./admin/admin_home', {results: results, results1: "null"});
				}else{
					res.send('Error!.. try again...');
				}
			});		
		}else{
			res.send('Error!.. try again...');
		}
	});
});

router.get('/deleteUser/:id', function(req, res){
	// console.log('working for now');
	admin_model.delete(req.params.id, function(result){

		if(result != null){
			admin_model.getAll(function(results){
				if(results != null){
			  		console.log(results);
					res.render('./admin/admin_home', {results: results, results1: "null"});
				}else{
					res.send('Error!.. try again...');
				}
			});		
		}else{
			res.send('Error!.. try again...');
		}
	});
});

router.post('/', function(req, res){
	console.log('working for now');
	var id = req.body.id;
	var username = req.body.username;
	if(id==""){
		id=" ";
	}else if(username==""){
		username=" ";
	}else{
		//do nothing...
	}
	data = {
		id: id,
		username: username
	}
	console.log(data);
	admin_model.search(data, function(results){

		if(results != null){
			res.render('./admin/admin_home', {results: results, results1: "null"});	
		}else{
			res.send('Error!.. try again...');
		}
	});
});

router.get('/imageDelete/:id', function(req,res){
	admin_model.deleteWeddingImage(req.params.id, function(status){
		if(status){
			admin_model.getAll(function(results){
				console.log(results);
				if(results != null){
					admin_model.getWeedingPhotos(function(results1){
						console.log(results1);
						if(results1 != null){
							res.render('./admin/admin_home', {results: results, results1: results1});
						}else{
		
						}
					});  
				}else{
					res.send('Error!.. try again...');
				}
			});
		}else{
			res.send('Error!.. try again...');
		}
	});
});


module.exports=router;

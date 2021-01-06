var express=require('express');
var messenger_model = require.main.require('./models/messenger_model');
var router=express.Router();


// router.get('/:id', function(req,res){
//     data = {
//         sender_id: "1",
//         receiver_id: req.params.id
//     }
//     messenger_model.getFriends(data, function(results){
// 		if(results != null){
//             console.log(results);
// 			res.render('./messenger/messenger_home', {results1: results, data: data});
// 		}else{
// 			res.send('Error!.. try again...');
// 		}
// 	});
// });

router.get('/getMessage/:id', function(req,res){
    data = {
        sender_id: "1",
        receiver_id: req.params.id
    };
    console.log(data.sender_id);
    messenger_model.getMessage(data, function(results2){
        messenger_model.getFriends(data, function(results1){
        console.log('results 1',results1);

            if(results1 != null && results2 != null){
                //console.log('Time to render chat '+results2[0].message);
                res.render('./messenger/messenger_home', {results2: results2, results1: results1, data: data});
            }else{
                res.send('Error!.. try again...');
            }
        });
    });
});


router.post('/:id', function(req,res){
    data = {
        sender_id: "1",
        receiver_id: req.params.id,
        message: req.body.message
    };
    messenger_model.insertData(data, function(status){
        if(status){
            res.redirect('/messenger/getMessage/'+data.receiver_id);
        }else{
            res.send('Error!.. try again...');
        }
    });


});

module.exports=router;
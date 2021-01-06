var db = require('./db');

module.exports = {
    insertCart: function(photo_id,category,user_id, callback){
		var sql="insert into cart values ('','"+photo_id+"','"+category+"','"+user_id+"')";
        // console.log(sql);
        db.execute(sql, function(status){
        // console.log(status);
			callback(status);
		});
	},
	checkCart:function(photo_id,category,user_id, callback){
		var sql = "select * from cart where photo_id='"+photo_id+"' and category='"+category+"' and user_id= '"+user_id+"'";
        db.getResult(sql, function(results){
        // console.log(results.length);
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	countCart:function(user_id, callback){
		var sql = "select * from cart where user_id="+user_id;
		console.log(sql);
		
        db.getResult(sql, function(results){
        // console.log(results.length);
			callback(results);
		});
	},
}
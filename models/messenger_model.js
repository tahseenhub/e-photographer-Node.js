var db = require('./db');

module.exports = {

    getFriends: function(data, callback){
		var sql = "select * from user where id != "+data.sender_id;
		db.getResult(sql, function(results){
			callback(results);
		});
	},

    getMessage: function(data, callback){
        var sql = "Select * from messenger where (sender_id='"+data.sender_id+"' and receiver_id='"+data.receiver_id+"') or (sender_id='"+data.receiver_id+"' and receiver_id='"+data.sender_id+"')";
        db.getResult(sql, function(results){
            console.log(results);
            callback(results);
        });
    },

    insertData: function(data, callback){
        console.log(data.sender_id);
        console.log(data.receiver_id);
        console.log(data.message);
        var sql = "INSERT INTO `messenger`(`sender_id`, `receiver_id`, `message`, `image`) VALUES ("+data.sender_id+","+data.receiver_id+",'"+data.message+"',null)";
        db.execute(sql, function(status){
			callback(status);
		});
    }


}


var db = require('./db');

module.exports = {
    getId: function(str, callback){
        var sql='select id from user where email="'+str+'"';
        db.getResult(sql,function(results){
            callback(results);
        });
    },
    geBytId: function(id, callback){
        var sql='select * from user where id='+id;
        db.getResult(sql,function(results){
            // console.log(sql);
            callback(results);
        });
    },
    getAll: function(str, callback){
        var sql='select * from user where email="'+str+'"';
        db.getResult(sql,function(results){
            callback(results);
        });
    },
    getExtra: function(str, callback){
        var sql='select * from user where email="'+str+'"';
        db.getResult(sql,function(results){
            callback(results);
        });
    },
    checkUnique: function(str,column, callback){
        var sql='select * from user where '+column+"='"+str+"'";
        // console.log(sql);
        db.getResult(sql,function(results){
            callback(results);
        });
    },
    insertUser: function(user, callback){
        var sql="insert into user values ('','"+user.name+"','"+user.username+"','"+user.email+"','"+user.password+"','"+user.img+"','','','','"+user.type+"','')";
        // console.log(sql);
        db.execute(sql, function(status){
        // console.log(status);
			callback(status);
        });
        
    },
    insertFeedback: function(user, callback){
        var sql="insert into feedback values ('','"+user.email+"','"+user.feedback+"')";
        // console.log(sql);
        db.execute(sql, function(status){
        // console.log(status);
			callback(status);
		});
    },
    validate: function(user, callback){
		var sql = "select * from user where email='"+user.email+"' and password='"+user.password+"'";
		db.getResult(sql, function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
    update_user_info: function(user, callback){
        // console.log(user.email);
		var sql = "update user set name='"+user.name+"',username='"+user.username+"', tagline='"+user.tagline+"', facebook='"+user.facebook+"', instagram='"+user.instagram+"' where email="+user.email;
        
        // console.log(sql);
        db.execute(sql, function(status){
            // callback(status);
            // console.log(status);
		});
	},
}
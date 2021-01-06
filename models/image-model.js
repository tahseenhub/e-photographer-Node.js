var db = require('./db');

module.exports = {
    getAll: function(callback){
		var sql = "select * from image_details";
		db.getResult(sql, function(results){
			callback(results);
		});	
    },
    getRecommendPhotos: function(callback){
		var sql = "select * from recommend_photos";
		db.getResult(sql, function(results){
			callback(results);
		});	
    },
    getImageById:function(photo_id, category, callback){
        var sql='select * from '+category+' where id='+photo_id;
        // console.log("getImageById",sql);
        db.getResult(sql,function(result){
            // console.log('image result',result);
            callback(result);
        });
    },
    
    getCategory:function(category,callback){
        var sql='select * from '+category;
        db.getResult(sql,function(result){
            callback(result);
        });
    },
    insertPhotosCategory: function(id,data, callback){
        var sql="insert into "+ data.category+" values ('','"+id+"','"+data.img+"','"+data.description+"')";
        console.log(sql);
        db.execute(sql, function(status){
        // console.log(status);
			callback(status);
		});
    },
    insertAllImage: function(photo_id, user_id, data, callback){
        var sql="insert into all_photo values ('','"+photo_id+"','"+data.category+"','"+user_id+"','"+data.description+"')";
        // console.log(sql);
        db.execute(sql, function(status){
        // console.log(status);
			callback(status);
		});
    },
    getImageId:function(data,callback){
        var sql='select * from '+data.category+' where img_name="'+data.img+'"';
        db.getResult(sql,function(result){
            callback(result);
        });
    },
    getAllFrom_all_photo:function(id,callback){
        var sql='select * from all_photo where user_id='+id;
        // console.log(sql);
        db.getResult(sql,function(result){
            callback(result);
        });
    }
};
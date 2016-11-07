var uuid = require("uuid");
var db = require("../app").bucket;
var config = require("../config");
var N1qlQuery = require('couchbase').N1qlQuery;
 
function userModel() { };

userModel.save = function(data, callback) {
    var documentId = data.document_id ? data.document_id : uuid.v4();
    db.upsert(documentId, data, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
    });
};

userModel.query = function(data, callback) {
    var statement = 'SELECT * FROM `' + config.couchbase.bucket + '` WHERE userName IS NOT MISSING AND userName = "'+data.username+'" LIMIT 1';
    var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    db.query(query, 
        function(error, result) {
            if(error) {
                return callback(error, null);
            }
            callback(null, result);
            });
};

userModel.getAll = function(callback) {
    var statement = "SELECT META(users).id, firstName, lastName, userName " +
                    "FROM `" + config.couchbase.bucket + "` AS users";
    var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        // console.log(result);
        callback(null, result);
    });
};

module.exports = userModel;
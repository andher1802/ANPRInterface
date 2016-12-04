var userModel = require("../models/user.model");

var appRouter = function(app) {
    app.get("/fetch", function(req, res) {
        userModel.getAll(function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            return res.send(result);
        });
    });

    app.get("/userinfo", function(req, res) {
        userModel.query(req.headers, function(error, result) {
            if(error) {
                return res.status(400).send(error);
            } 
            if(result.length > 0 ){
                return res.send(result[0]['anpr-test']);
            }
        });
    });

    app.post("/auth", function (req, res) {
        var statusLogin = new Object();
        userModel.query(req.body, function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            if (result.length > 0 ){
                if(result[0]['anpr-test'].password === req.body.password){
                    statusLogin.state = 1;
                    statusLogin.status = true;
                }
                else{
                    statusLogin.state = 2;
                    statusLogin.status = false;
                }
            }
            else{
                    statusLogin.state = 0;
                    statusLogin.status = false;
            }
            // console.log(statusLogin);
            return res.send(statusLogin); 
        });
    });
};
module.exports = appRouter;
var express = require('express');
var router = express.Router();

app.get("/movies", async (request, response) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mistral-task");
        dbo.collection("movie").findOne({}, function (err, result) {
            if (err) throw err;
            response.send(result.results);
            db.close();
        });
    });
});

app.get("/series", async (request, response) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mistral-task");
        dbo.collection("series").findOne({}, function (err, result) {
            if (err) throw err;
            response.send(result.results);
            db.close();
        });
    });
});

module.exports = router;
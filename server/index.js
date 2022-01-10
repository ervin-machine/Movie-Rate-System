const express = require("express")
const cors = require("cors")
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const bodyParser = require('body-parser')
require('dotenv').config();
const mongoose = require('mongoose');
const movieModel = require('./models/Movies');
const serieModel = require('./models/Series');
const ratingModel = require('./models/Ratings');
const ObjectID = require('mongodb').ObjectID;
const app = express();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const cluster = process.env.CLUSTER;
const dbname = process.env.DBNAME;

const verifyJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksreqsPerMinute: 5,
        jwksUri: 'https://dev-t3-qedh1.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'Unique auth',
    issuer: 'https://dev-t3-qedh1.us.auth0.com/',
    algorithms: ['RS256']
}).unless({ path: "/rate-movie" });

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(verifyJwt)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const url = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post("/rate-movie", (req, res) => {
    const { title, rate } = req.body;

    var new_user = new ratingModel({
        _id: new ObjectID(),
        title: title,
        rate: rate
    })
      
    new_user.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
        }
    })
})

app.get("/movies", async (req, res) => {
    movieModel.find().lean().exec(function (err, movies) {
        return res.send(movies);
    })
});

app.get("/series", async (req, res) => {
    serieModel.find().lean().exec(function (err, series) {
        return res.send(series);
    })
});

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 484;
    next(error);
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message || 'Interval server error'
    res.status(status).send(message)
})

app.listen(4000, () => {
    console.log("Listening on port 4000")
})
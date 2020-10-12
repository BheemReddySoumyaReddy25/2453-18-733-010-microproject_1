var express = require("express");
var app = express();
//Connecting Mongodb
const MongoClient = require("mongodb").MongoClient;
//Database Connection
const url = "mongodb://127.0.0.1:27017";
const dbName = 'hospitalManagement';
let db;
//bodyparser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Connecting server file for AWT
let server = require('./server');
let middleware = require('./middleware');

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err);
    db = client.db(dbName);
    console.log(`Connected Database: ${url}`);
    console.log(`Database : ${dbName}`);

});
//Hospital details
app.get('/hospital', middleware.checkToken, (req, res) => {
    console.log("Fetching data from Hospital collection");
    var data = db.collection("hospital").find().toArray().then(result => res.json(result));

});
//Ventilator Details
app.get('/ventilator', middleware.checkToken, (req, res) => {
    console.log("Fetching ventilators Details");
    var data = db.collection("ventilators").find().toArray().then(result => res.json(result));
});
//Search Ventilator by status
app.post('/searchventilatorstatus', middleware.checkToken, (req, res) => {
    var status = req.body.status;
    var data = db.collection("ventilators").find({ "status": status }).toArray().then(result => res.json(result));
    console.log(status);

});
// Search By Hospital name
app.post('/searchhospitalname', middleware.checkToken, (req, res) => {
    var name = req.body.name;
    var data = db.collection("ventilators").find({ "name": name }).toArray().then(result => res.json(result));
    console.log(name);

});
//update the Ventilator details
app.put('/updateventilator', middleware.checkToken, (req, res) => {
    var ventId = req.body.ventilatorId;
    console.log(ventId);
    var status = req.body.status;
    console.log(status);
    var data = db.collection("ventilators").updateOne({ "ventilatorId": ventId }, { $set: { "status": status } }, (err, result) => {
        if (err) throw err;
        res.json(result);

    });
});
//Add the Ventilator details
app.post('/addventilator', middleware.checkToken, (req, res) => {

    var item = req.body;
    db.collection('ventilators').insertOne(item, (err, result) => {
        if (err) throw err;
        res.json("1 Item inserted");
    });
});
//Add the Hospital details
app.post('/addhospital',middleware.checkToken, (req, res) => {
    var hId = req.body.hId;
    var name = req.body.name;
    var address = req.body.address;
    var location = req.body.location;
    var contactNo = req.body.contactNo;
    console.log('Adding hospital.....');
    var add = {"hId":hId, "name":name,"location":location,"address":address,"contactNo":contactNo};
    var data = db.collection("hospital").insertOne(add,(err, result) => {
        if (err) throw err;
        res.json("1 Item inserted");

    });
});

app.delete('/delete', middleware.checkToken, (req, res) => {
    var ventId = req.body.ventilatorId;
    console.log(ventId);
    db.collection('ventilators').deleteOne({ 'ventilatorId': ventId }, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});
app.delete('/deletehospital', middleware.checkToken, (req, res) => {
    var hId = req.body.hId;
    console.log(hId);
    db.collection('hospital').deleteOne({ 'hId': hId }, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});
app.listen(3000);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function() {
    console.log('we are connected!');
});

var mySchema = mongoose.Schema({
    name: String
});

mySchema.methods.speak = function() {
    console.log('Im not your buddy, guy.');
}

var Buddy = mongoose.model('Buddy',mySchema);

var guy = new Buddy({name: 'not your buddy guy'});
Buddy.find({name: 'not your buddy guy'}).remove().exec();

guy.save(function (err, guy) {
    if(err) return console.error(err);
    guy.speak();
});

Buddy.find(function(err,buddies) {
    if(err) console.log(err);
    console.log(buddies);

});
//Web server test
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://IEEE123:TxPCrrXADKv7YGh5@cluster0-shard-00-00-u50s6.mongodb.net:27017,cluster0-shard-00-01-u50s6.mongodb.net:27017,cluster0-shard-00-02-u50s6.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
var pwr = "TxPCrrXADKv7YGh5";
MongoClient.connect(uri, function(err, db) {
    // Paste the following examples here
    if(err) {
        console.log(err);
    }
    else {
        console.log("MongoDB atlas connected");
        db.collection('inventory').deleteMany({});
        db.collection('inventory').insertMany([
            // MongoDB adds the _id field with an ObjectId if _id is not present
            {
                item: "journal", qty: 25, status: "A",
                size: {h: 14, w: 21, uom: "cm"}, tags: ["blank", "red"]
            },
            {
                item: "notebook", qty: 50, status: "A",
                size: {h: 8.5, w: 11, uom: "in"}, tags: ["red", "blank"]
            },
            {
                item: "paper", qty: 100, status: "D",
                size: {h: 8.5, w: 11, uom: "in"}, tags: ["red", "blank", "plain"]
            },
            {
                item: "planner", qty: 75, status: "D",
                size: {h: 22.85, w: 30, uom: "cm"}, tags: ["blank", "red"]
            },
            {
                item: "postcard", qty: 45, status: "A",
                size: {h: 10, w: 15.25, uom: "cm"}, tags: ["blue"]
            }
        ]).then(function (result) {
            // process result
            var cursor = db.collection('inventory').find({
                size: { h: 14, w: 21, uom: "cm" }
            });
            console.log(result);
        });
    }
    db.close();
});
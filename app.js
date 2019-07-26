var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")
    http = require("http"):
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://publicguy37:yaydatabases@cluster0-owcel.mongodb.net/community_levels?retryWrites=true&w=majority", { useNewUrlParser: true })
var levelSchema = new mongoose.Schema({
    name: String,
    map: [String],
    creator: String,
    background: Number,
    music: Number,
    topGroundColor: [Number],
    groundColor: [Number],
});
var Level = mongoose.model("Level", levelSchema);

var allowCrossDomain = function(req, res, next) { //everyone hates CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.redirect("https://supermarioderp.tannerderp.tk");
});
app.get("/levels", function(req, res){
    Level.find({}, function(error, levels){
        if(error) {
            console.log(error);
        } else {
            res.send(levels);
        }
    })
});

app.post("/newlevel", function(req, res){
    var b = req.body;
    var newLevel = {
        name: b.name || "Untitled",
        map: b.map || [""],
        creator: b.creator || "Secret Boi",
        background: b.background || 0,
        music: b.music || 0,
        topGroundColor: b.topGroundColor || [57, 175, 14],
        groundColor: b.groundColor || [175, 118, 10],
    }
    Level.create(newLevel, function(error, level){
        if(error){
            console.log("epic error:");
            console.log(error);
        } else{
            console.log("sucessful level upload!!");
            console.log(level);
        }
    })
})

app.listen(process.env.PORT || 9000, process.env.IP, function(){
    console.log("Server has started on port " + (process.env.PORT || 9000));
});

setInterval(function(){
    http.get("http://super-mario-derp.herokuapp.com/");
}, 250000)

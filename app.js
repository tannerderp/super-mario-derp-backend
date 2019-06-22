var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://publicguy37:yaydatabases@cluster0-owcel.mongodb.net/community_levels?retryWrites=true&w=majority", { useNewUrlParser: true })
var levelSchema = new mongoose.Schema({
    name: String,
    map: [String],
    creator: String,
});
var Level = mongoose.model("Level", levelSchema);

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

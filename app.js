var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://publicguy37:yaydatabases@cluster0-owcel.mongodb.net/community_levels?retryWrites=true&w=majority", { useNewUrlParser: true })
var levelSchema = new mongoose.Schema({
    name: String,
    level: [String],
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

app.listen(process.env.PORT || 9000, process.env.IP, function(){
    console.log("Server has started on port " + (process.env.PORT || 9000));
});

const express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");
const trySchema = new mongoose.Schema({
    name : String
});
const Item = mongoose.model("task",trySchema);
// const todo = new Item({
//     name: "Create some videos"
// });
// const todo2 = new Item({
//     name: "Learn DSA"
// });
// const todo3 = new Item({
//     name: "Learn React"
// });
// const todo4 = new Item({
//     name: "Take some rest"
// });
// todo2.save();
// todo3.save();
// todo4.save();
app.get("/", async function (req, res) { // Changed function to async
    try {
        const foundItems = await Item.find({}); // Updated to use async/await
        res.render("list", { dayej: foundItems });
    } catch (err) {
        console.log(err);
    }
});
app.post("/",function(req,res){
    const itemName = req.body.ele1;
    const todo4 = new Item({
        name:itemName
    });
    todo4.save();
    res.redirect("/");
});
// app.post("/delete",function(req,res){
//     const checked = req.body.checkbox1;
//     Item.findByIdAndDelete(checked,function(err){
//         if(!err){
//             console.log("Deleted");
//             res.redirect("/");
//         }
//     })
// });
app.post("/delete", async function (req, res) {
    try {
        const checked = req.body.checkbox1;
        await Item.findByIdAndDelete(checked);
        console.log("Deleted");
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});


app.listen("8000",function(){
        console.log("server is running");
});
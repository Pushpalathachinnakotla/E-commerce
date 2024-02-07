let mongoose=require("mongoose")
let cartsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "price":Number,
    "qty":{
        type:Number,
        default:1
    },
    "desc":String,
    "cat":String,
    "img":String,
    "pid":String,
    "uid":String

})

module.exports=mongoose.model("cart",cartsch)
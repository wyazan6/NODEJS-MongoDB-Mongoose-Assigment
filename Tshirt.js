const mongoose = require ("mongoose");

const Objectid = mongoose.Schema.Types.ObjectID

let Schema = mongoose.Schema;

let Tshirt = new Schema({
    ID : Number,
    Name : String ,
    TshirtCategoryID : Number,
    TshirtPrice : Number,
    NumberOfAvailableItems : Number,

    Category : [{type : Objectid , ref:'Category'}]

})

module.exports = mongoose.model('Tshirt',Tshirt);
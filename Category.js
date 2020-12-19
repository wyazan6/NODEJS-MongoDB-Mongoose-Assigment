const mongoose = require ("mongoose");

let schema = mongoose.Schema;

let Category = new schema({
    ID : Number,
    Name : String ,
 

})

module.exports = mongoose.model('Category ',Category );
const mongoose = require ("mongoose");

let schema = mongoose.Schema;

let Orders  = new schema({

    ID : Number,
    OrderNumber :Number,
    TshirtID  : Number,
    OrderDateTime : String,
    CustomerPhoneNumber : Number
 

})

module.exports = mongoose.model( 'Orders' , Orders );
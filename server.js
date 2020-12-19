const app = require("express")();

const bodyParser = require("body-parser");

let mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const db =
    mongoose.connect('mongodb://localhost/Category', {
        useNewUrlParser: true,
        useUnifedTopology: true
    })

    let Tshirt = require('./Tshirt')
    let Category = require('./Category')

app.post('/Tshirt', function (req, res) {
    let NewTshirt = new Tshirt()

    NewTshirt.ID = req.body.ID;
    NewTshirt.TshirtName = req.body.TshirtName;
    NewTshirt.TshirtCategoryID  = req.body.TshirtCategoryID ;
    NewTshirt. TshirtPrice = req.body. TshirtPrice;
    NewTshirt.NumberOfAvailableItems = req.body.NumberOfAvailableItems;
    

    NewTshirt.save(function (err, savedTshirt) {

        if (err) {
            res.status(500).send({ error: "coudn`t add Tshirt" })
        }
        else {
            res.send(savedTshirt)
        }
    })

})
app.get('/Tshirt', function (req, res) {
    Tshirt.find({}, function (err, Tshirt) {
        if (err) {
            res.status(500).send({ Error: "coudn`t add Tshirt" })
        } else {
            res.send(Tshirt)
        }

    })

})
app.post('/Category', function (req, res) {
    let NewCategory= new Category()

    NewCategory.ID = req.body.ID;
    NewCategory.Name = req.body.Name;
    NewCategory.save(function (err, savedCategory) {

        if (err) {
            res.status(500).send({ error: "coudn`t add Category" })
        }
        else {
            res.send(savedCategory)
        }
    })

})

app.get('/Category', function (req, res) {

    Category.find({}).populate(
        {
        path: 'Tshirt' , 
        model : 'Tshirt',
        select : "ID",
        select : "name"
        
    }
    ).exec(function(err,Category){

        if (err) {
            res.status(500).send({Error : "coudn`t get Category"})
        }
        else{
            res.send(Category);
        }
    })
})
app.put('/Tshirt/Category/add', function (res, req) {

    let CategoryID = req.body.Categoryid

    let TshirtID = req.body.Tshirtid

    Category.findone({ id:  CategoryID  }, function (err,  Category) {

        if (err) 
        {
            res.status(500).send({ error: "coudn`t find  Category" })
        }
        else 
        {
            Tshirt.updateOne({ id: TshirtID }, { $addToSet: { Category: Category.id } },
                function (err, status) {
                    if (err) {

                        res.status(500).send({ error: "coudn`t update Tshirt" })
                    }

                    else {
                        res.send(status)
                    }
                }
            )
        }
    }
    )
})






app.listen(3000, function () {
    console.log("Server is running");
})
const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require('./db/User');
const Product = require("./db/Product")
const app = express();
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('./db/auth.middleware')
jwtKey = 'secret';

app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
   let user = new User(req.body);
   console.log(user);
   let hash = await bcrypt.hashSync(user.password, 10);
   console.log(hash);
   user.password = hash;
   let result = await user.save();
   console.log(result);
//    result = result.toObject();
//    delete result.password;
   Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
    if(err){
        res.send("Something went wrong")  
    }
    res.send({result,token:token})
})
})

app.post("/api/login", async (req, res) => {
    let user = await User.findOne({email:req.body.email});
    if(!user){
        res.send("Invalid email")
    }
    let result = await bcrypt.compare(req.body.password, user.password);
    if(!result){
        res.send("Invalid password")
    }
    Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send("Something went wrong")  
        }
        res.send({user,token:token})
    })
});


//create product
app.post("/api/product", auth, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

//get all products
app.get("/api/products" ,auth, async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {  
        res.send(products)
    } else {
        res.send({ result: "No Product found" })
    }
});

//get product by id
app.get("/api/product/:id",auth, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ "result": "No Record Found." })
    }
})


//update product
app.put("/api/product/:id",auth, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
});


//delete product
app.delete("/api/product/:id",auth, async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result)
}),


//get product by search
app.get("/api/search/:key",auth, async (req, res) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    res.send(result);
})

// function verifyToken (req, res, next) {
//     let token = req.headers['authorization'];
//     if (token) {
//         token = token.split(' ')[1];
//         Jwt.verify(token, jwtKey, (err, valid) => {
//             if (err) {
//                 res.send("Invalid Token")
//             } else {
//                 next();
//             }
//         })
//     }else{
//         res.send("No Token Found")
//     }
// }

app.listen(5000, () => {
    console.log('listening on port 5000');
});
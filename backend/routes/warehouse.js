const express = require('express');
const router = express.Router();
const ProductList = require('../models/productData');


router.get('/', (req,res,next) => {
    ProductList.find({})
        .then(data => {
            res.status(201).json({message: "Product details fetched successfully!!", data: data});
        })

})

router.post('/productList', (req,res,next) => {
    console.log('Backend', req.body);
    const product = new ProductList({pimg: req.body.pimg,ptype: req.body.ptype,pid: req.body.pid,pname: req.body.pname,pno: req.body.pno,pprice: req.body.pprice});
    product.save().then(result => {
        console.log(result._id);
        res.status(201).json({message: "Product list received successfully!!"});
      });
})

router.delete('/productList', (req,res,next) => {
    console.log('Product Id to be deleted:', req.body.id);
    ProductList.deleteOne({'pid': req.body.id})
        .then((result) => {
            res.status(201).json({message: "Product deleted successfully!!"});
        },
        (error) => {
            res.status(500).json({message: "Product deletion unsuccessful!!"})
        })
})

module.exports = router;
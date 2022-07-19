const express=require('express');
const Products=require('../Models/Products.model');

const router=express.Router();

router.post("/",async(req,res)=>{
    try {
        const product= await Products.create(req.body);
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
});

router.get("/",async(req,res)=>{
    try {
        const products=await Products.find().lean().exec();
        return res.status(200).send({products:products})
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
});



router.delete("/:id",async(req,res)=>{
    try {
        const product=await Products.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(product)
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
});


router.patch("/:id",async(req,res)=>{
    try {
        const product=await Products.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
        return res.status(200).send(product)
    } catch (error) {
        return res.status(500).send({message:error.message});
    }
});


module.exports=router;
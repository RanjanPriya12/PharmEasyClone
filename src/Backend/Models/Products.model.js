const mongoose=require('mongoose');


const productSchema=new mongoose.Schema({  
			"product_name":{type:String, required:true},
			"product_url1":{type:String, required:true},
			"product_url2":{type:String, required:true},
			"product_url3":{type:String, required:true},
			"product_url4":{type:String, required:true},
            "product_type":{type:String,required:true},
			"product_subcategory":{type:String, required:true},
			"product_brand":{type:String, required:true},
			"manufacturer_details":{type:String, required:true},
			"size":{type:[String], required:false},
			"varient":{type:[String], required:false},
			"price":{type:Number, required:true},
			"stricked_price":{type:Number, required:true},
			"rating":{type:Number, required:true},
			"origin_country":{type:String, required:true},
			"expiry_date":{type:String, required:true},
			"discount":{type:Number, required:true},
},{
    versionKey:false,
    timestamps:true
});

const Products=new mongoose.model("product",productSchema);

module.exports=Products;
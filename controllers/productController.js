const Product = require("../models/Product");


exports.createProduct=async(req,res)=>{
    try{
        const{title,description,price,image}=req.body
        const newProduct=new Product({ title, description, price, image })
        await newProduct.save()
    
       res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
};


exports.deleteProduct=async(req,res)=>{
   try{
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
   }catch(err){
    res.status(500).json({ message: err.message });
   }


    }
exports.updateProduct=async(req,res)=>{
  console.log("Update API Hit"); 
    try{
await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json({ message: "Product Updated" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }

}


exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};



exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Get all products from MongoDB
    res.json(products); // Return them as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

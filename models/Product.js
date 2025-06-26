const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String, // image URL   
})
module.exports = mongoose.model("Product", productSchema);
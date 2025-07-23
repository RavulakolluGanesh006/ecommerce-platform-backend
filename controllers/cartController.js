// controllers/cartController.js
const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, products: [{ productId, quantity: 1 }] });
    } else {
      const existing = cart.products.find(p => p.productId == productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  let cart = await Cart.findOne({ userId: req.user.id });
  cart.products = cart.products.filter(p => p.productId != productId);
  await cart.save();
  res.json({ message: "Removed from cart" });
};

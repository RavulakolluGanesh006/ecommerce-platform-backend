const Order = require("../models/Order");
const User = require("../models/User");
const { sendEmail } = require("../utils/sendOrderEmail");

exports.saveOrder = async (req, res) => {
  try {
    const { address, amount, paymentId, products } = req.body;

    console.log("📥 Received order request");

    // Save the order
    const order = new Order({
      userId: req.user.id,
      address,
      amount,
      paymentId,
      products,
    });

    await order.save();
    console.log("✅ Order saved");

    // Fetch user info
    const user = await User.findById(req.user.id);
    if (!user) throw new Error("User not found");

    // Send order details via email
    const to ="ravulakolluganesh06@gmail.com" ; // 🔁 Replace with actual admin email"ra
    const bcc = user.email;

    const subject = "🛒 New Order Received";
    const message = `
New Order Placed:

🧾 Order ID: ${order._id}
👤 Customer: ${address.fullName}
📞 Mobile: ${address.mobileNo}
🏠 Address: ${address.houseNo}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}, ${address.country}
📌 Landmark: ${address.landmark}
🌍 Location: ${address.location}
💳 Payment ID: ${paymentId}
💰 Amount: ₹${amount}
📧 User Email: ${user.email}
    `;

    await sendEmail({ to, bcc, subject, message });

    // console.log("📧 Email sent to admin and customer");

    res.status(201).json({ message: "Order saved and email sent", order });
  } catch (err) {
    console.error("❌ Order saving failed:", err);
    res.status(500).json({
      message: "Order saving failed",
      error: err.message || "Unknown error",
    });
  }
};
// ✅ Admin: Get all orders
exports.getAllOrders = async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "Access denied" });

  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "title price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Regular: Get orders with full info
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.productId")
      .populate("userId", "name email");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

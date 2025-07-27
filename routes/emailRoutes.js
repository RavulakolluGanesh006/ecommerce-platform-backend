const express = require("express");
const router = express.Router();
const sendOrderEmail = require("../utils/sendOrderEmail");

router.post("/send-confirmation", async (req, res) => {
  try {
    const { from, to, fullName, amount, address, paymentId, products } = req.body;

    if (!to || !from) return res.status(400).json({ message: "`from` and `to` fields are required." });

    const html = `
      <h2>Hello ${fullName},</h2>
      <p>🧾 Thank you for placing your order with us!</p>
      <p><strong>Amount:</strong> ₹${amount}</p>
      <p><strong>Payment ID:</strong> ${paymentId}</p>

      <p><strong>Shipping Address:</strong><br>
      ${address.houseNo}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}, ${address.country}<br>
      📍 Location: <a href="${address.location}" target="_blank">${address.location}</a><br>
      📞 Mobile: ${address.mobileNo}
      </p>

      <p><strong>Products:</strong></p>
      <ul>
        ${products
          .map((p) => `<li>${p.title} – ₹${p.price} × ${p.quantity} = ₹${p.price * p.quantity}</li>`)
          .join("")}
      </ul>
    `;

    await sendOrderEmail(from, to, "🛒 Order Confirmation - Your Store", html);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;

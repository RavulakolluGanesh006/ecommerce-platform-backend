const nodemailer = require('nodemailer');

const sendEmail = async (body) => {
  try {
    console.log('Received email payload:', body);
    const { to, subject, message, attachment, filename, bcc } = body;

    if (!to || !subject || !message) {
      throw {
        statusCode: 400,
        body: {
          message: "Missing required email fields i (to, subject, message)",
          error: { code: "ValidationException" }
        }
      };
    }

    const transporter = nodemailer.createTransport({
    service:"gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      bcc, 
      text: message,
      attachments: attachment ? [{
        filename,
        content: attachment.split("base64,")[1],
        encoding: 'base64',
      }] : []
    };

    console.log("Sending email to:", to);
    console.log("Mail options:", mailOptions);

    console.time("sendMail");
    await transporter.sendMail(mailOptions);
    console.timeEnd("sendMail");

    return {
      statusCode: 200,
      body: {
        message: "Email sent successfully",
        data: { to, subject }
      }
    };
  } catch (err) {
    console.log("Error in email service:", err);
    throw err;
  }
};

module.exports = { sendEmail };

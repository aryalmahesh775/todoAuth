const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpToEmail = async (email, otp) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: email, // list of receivers
      subject: "Your email verification otp", // Subject line
      text: `Your otp is ${otp} . It will expire in 10 minutes.`, // plain text body
      html: `<b>Your otp is ${otp} . It will expire in 10 minutes.</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    return info;
  } catch (error) {
    console.error(error, "error sending email OTP")
    throw new Error(error.message, 'Failed to send OTP email')
  }
};


module.exports = {sendOtpToEmail}
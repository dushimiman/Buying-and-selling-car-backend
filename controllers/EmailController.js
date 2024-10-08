const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to send email
const sendCarRequestEmail = async (req, res) => {
  const { carBrand, bodyType, ownerEmail } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS,  // Use environment variable
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: ownerEmail,
      subject: `Car Request: ${carBrand} ${bodyType}`,
      text: `Your car ${carBrand}, ${bodyType} is requested by a buyer. Please check your account for details.`,
    };

    let info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ', info.response);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email: ', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
};

module.exports = { sendCarRequestEmail };

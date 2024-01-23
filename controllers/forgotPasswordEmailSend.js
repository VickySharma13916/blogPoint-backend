const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
// const FRONTEND_URL = "http://localhost:3000";
const FRONTEND_URL = "https://turacozadmin.turacoz.com";
const sendVerificationMail = async (sendVerificationToken) => {
  let config = {
    // service: "gmail",
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "TLSv1.2",
    },
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };
  let transporter = nodemailer.createTransport(config);
  const { token, email } = sendVerificationToken;

  let Mailgenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Turacoz Website",
      link: "https://turacoz.com",
    },
  });

  let response = {
    body: {
      name: "Turacoz Website",
      intro: "Forgot Password Email Verification Send",
      action: {
        instructions:
          "Please click the button below to reset password of your account",
        button: {
          color: "#33b5e5",
          text: "Reset Password",
          link: `${FRONTEND_URL}/reset-password/${email}/token=${token}`,
        },
      },
      outro: "Help to reset the Password",
    },
  };

  let mail = Mailgenerator.generate(response);
  let message = {
    from: `Turacoz Healthcare Solutions ${process.env.EMAIL}`,
    to: email,
    subject: "Sending Forgot Password Email Verification",
    text: `<a href="${FRONTEND_URL}/reset-password/${email}/${token}" target="_blanked">${FRONTEND_URL}/reset-password/${email}/${token}</a>`,
    html: mail,
  };
  try {
    let info = await transporter.sendMail(message);
    console.log("Verification Send to the Email.");
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = sendVerificationMail;

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const ContactEmailSend = async (
  savedRequestProposal,
  emailsWithProposalRequest
) => {
  // let testAccount = await nodemailer.createTestAccount();
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   auth: {
  //     user: testAccount.user,
  //     pass: testAccount.pass,
  //   },
  // });

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
  const {
    addressLine1,
    addressLine2,
    city,
    company,
    country,
    email,
    firstName,
    lastName,
    message,
    outsourcingTimeline,
    phone,
    referalInterest,
    serviceInterest,
    state,
    therapyInterest,
    title,
    zip,
  } = savedRequestProposal;

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
      intro: "Contact Us Form Data",
      table: {
        data: [
          {
            ProposalCustomerData: "Contact Us Form Data",
            FullName: title + " " + firstName + " " + lastName,
            Company: company,
            country: country,
            fullAddress:
              addressLine1 +
              " " +
              addressLine2 +
              " " +
              city +
              " " +
              state +
              " " +
              zip,
            Email: email,
            Details: message,
            mobileNumber: phone,
            outsourcingTimeline: outsourcingTimeline,
            serviceInterest: serviceInterest,
            referalInterest: referalInterest,
            therapyInterest: therapyInterest,
          },
        ],
      },
      outro: "Help to build the customer Relations",
    },
  };

  let mail = Mailgenerator.generate(response);
  let newMessage = {
    from: `Turacoz Healthcare Solutions ${process.env.EMAIL}`,
    to: emailsWithProposalRequest,
    subject: "Sending Contact Us Form Data From Client",
    text: `Contact Form Data:\n\nFullName: ${
      title + firstName + lastName
    }\nCompany: ${company}\nEmail: ${email}\nRequirement Detail: ${message}`,
    html: mail,
  };
  try {
    let info = await transporter.sendMail(newMessage);
    console.log("Email Sent to the Mail",info);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = ContactEmailSend;

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const backend_url = process.env.BACKEND_APP_URL;
const sendMail = async (savedRequestProposal, emailsWithProposalRequest) => {
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
    fullName,
    company,
    country,
    RequirementDetail,
    RequirementHighlight,
    email,
    link,
    contactMode,
    mobileNumber,
    proposalFile,
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
      intro: "Request for proposal Data is Coming.",
      table: {
        data: [
          {
            ProposalCustomerData: "Request Proposal Data",
            FullName: fullName,
            Company: company,
            country: country,
            contactMode: contactMode,
            Email: email,
            link: link && backend_url + "/" + link,
            proposalFile: proposalFile,
            mobileNumber: mobileNumber,
            Requirement_Detail: RequirementDetail,
            Requirement_Highlight: RequirementHighlight,
          },
        ],
      },
      outro: "Help to build the customer Relations",
    },
  };

  let mail = Mailgenerator.generate(response);
  let message = {
    from: `Turacoz Healthcare Solutions ${process.env.EMAIL}`,
    to: emailsWithProposalRequest,
    subject: "Sending Proposal For Request From Client",
    text: `Request Proposal Data:\n\nName: ${fullName}\nCompany: ${company}\nEmail: ${email}\nRequirement Detail: ${RequirementDetail}`,
    html: mail,
  };
  try {
    let info = await transporter.sendMail(message);
    console.log("Email Sent to the Mail",info);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = sendMail;

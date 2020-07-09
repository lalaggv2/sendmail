const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
require("dotenv").config();

const app = express();

//Engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
  <p>You have a new request</p>
  <h3>Contact details</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Company: ${req.body.company}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
 `;
});

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'josianne.ullrich@ethereal.email',
    pass: 'QC9ZgFHy8AKr1TYHqG'
  }
});

// const transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "ab4d5badf5923e",
//     pass: "c94ab9f6b80d78"
//   }
// });

// send mail with defined transport object
let mailOptions = {
  from: '"Nodemailer contact" < josianne.ullrich@ethereal.email>', // sender address
  to: "luangu2020@gmail.com",
  // to: `${req.body.email}`, // list of receivers
  subject: "Your Recipe", // Subject line
  text: "Here you go", // plain text body
  //html: output // html body
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.render('contact', { msg: "Email has been sent" });
});



app.listen(3001, () => console.log("Server listening on PORT 3001"));



// Name	Josianne Ullrich
// Username	josianne.ullrich@ethereal.email (also works as a real inbound email address)
// Password	QC9ZgFHy8AKr1TYHqG
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
const multer = require('multer');
const crypto = require('crypto');
const xlsxtojson = require('xlsx-to-json');
const xlstojson = require("xls-to-json");

app.use(cors({ origin: "*" }));
let fileExtension = require('file-extension');
app.use(bodyParser.json());

 


app.post('/sendExcelFile', async (req,res)=>{
  const {
    file
} = req.body;
console.log(file,"file");
var sendMail = [];
file.forEach((element,i) => {
  let emailData = element.teEmailId
  sendMail.push(emailData);
  console.log(sendMail);
});
let transporter = nodemailer.createTransport({
  host: "testmedifit@gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  service: 'gmail',
  auth: {
    user: details.email,
    pass: details.password
  }
});

let mailOptions = {
  from: '"Mail"<testmedifit@gmail.com>', // sender address
  to: sendMail, // list of receivers
  subject: "Mail", // Subject line
  html: `<h1>Sub: Mail</h1><br>`
};

// send mail with defined transport object
let info = await transporter.sendMail(mailOptions);

// callback(info);

res.status(200).json({
  error:false,
  message:"Upload",
  file
})
console.log("Mail send successfull");
  // console.log(req);
  // const result = await excelToJson({
  //   sourceFile: './public/uploads/excel-to-json.xlsx'
  //  });
  //  console.log(result);
  //  var mails = result?.DataTimeResult;
  //  var mailsBox = [];
  //   mails.forEach(x=>{
  //     mailsBox.push(x['D'])
  //   })
  //   var requiredMails = mailsBox.slice(1,mailsBox.length);
  //   this.myMails = requiredMails;
  //   requiredMails.forEach(x=> {
  //     console.log(x);

  //   })
  //  res.send({ error:false,result:result?.DataTimeResult})

  // const uploadCsv = async (req, res, next) => {
  //   try {
  //       const {
  //           file
  //       } = req.body;
  //       console.log(file,"file");
  //       console.log(req.body);
  //       // const josnObject = await recipe.insertMany(file);
  //       // if (josnObject) {
  //       //     res.status(200).json({
  //       //         error: false,
  //       //         message: "File uplaod successfully",
  //       //         response: josnObject
  //       //     })
  //       // } else {
         
  //           // res.status(200).json({
  //           //     error: false,
  //           //     message: "Something went wrong",
  //           // })
  //       // }
  //   } catch(err) {
  //       next(err.message)
  //   }
  // }


})





app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome</h1>"
  );
});






app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  console.log(this.myMails);
  sendMail(user, info => {
    console.log(user);
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});


async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "testmedifit@gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"Mail"<testmedifit@gmail.com>', // sender address
    to: sendMail, // list of receivers
    subject: "Wellcome", // Subject line
    html: `<h1>Sub: ${user.name}</h1><br>
    <h4>Thank u from  ${user.body}</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);

////////////////////////////////////////////////////////////////////////////


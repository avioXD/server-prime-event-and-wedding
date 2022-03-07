const nodemailer = require("nodemailer");
exports.transporter = transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "primeeventandweddingsecurebot@gmail.com",
    pass: "Rajkumar1@",
  },
});

const clientRequestResponse = (name, email) => {
  const mailOptions = {
    from: "Prime event and wedding",
    to: email,
    subject: "Recived Information",
    attachments: [
      {
        filename: "trademark.png",
        path: "./marks/trademark.png",
        cid: "unique@cid",
      },
    ],
    html: `<!DOCTYPE html>
    <html lang="en">
    
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,400;0,500;0,700;1,100;1,200&display=swap"
                rel="stylesheet">
            <style>
                .logo {
                    padding: 0.5rem;
                }
    
                .logo img {
                    width: 15rem;
                }
    
                .card-success {
                    background: white;
                    padding: 60px;
                    border-radius: 4px;
                    box-shadow: 0 2px 3px #c8d0d8;
                    display: inline-block;
                    margin: 0 auto;
                    text-align: center;
    
                }
    
                .card-success p {
                    color: #404f5e;
                    font-family: 'Poppins', sans-serif;
                    font-size: 15px;
                    margin: 0;
                }
    
                .card-success h3 {
                    color: #88b04b;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 900;
                    font-size: 20px;
                    margin-bottom: 10px;
                }
    
                .card-success i {
                    color: #9abc66;
                    font-size: 100px;
                    line-height: 200px;
                    margin-left: -15px;
                }
                .t-small {
                  text-align: start;
                  font-weight: 500;
                  font-size: 13px;
                  font-family: 'Poppins', sans-serif;
              }
  
              span {
                  text-decoration: none;
                  
              }
    
            </style>
            <title>Document</title>
        </head>
    
        <body>
            <div class="card-success" *ngIf="onSuccess">
                <a href="#" class="logo mx-auto "><img src="cid:unique@cid"  ></a>
                <h3>Thank You! ${name}</h3>
                <p>We received your Information.We will reach you soon. </p>
                <br/>
                <br/>
                <span class="t-small">
                <span> phone: <a href="tel:+916289054155">+91 6289054155</a>/ <a href="tel:+91 9836366899">+91
                        9836366899</a></span>
                <br>
                <span class="text-3 ml-3">email: <a class="text-4"
                        href="mailto:primeeventandwedding@gmail.com">primeeventandwedding@gmail.com</a>
                </span>
                <br>
                <span>Address: Ultadanga road , kolkata -700048 </span>
            </div>
        </body>
    
    </html>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    if (info) {
      console.log(info);
    }
  });
};

const reviewFormTomail = (name, email) => {
  const mailOptions = {
    from: "Prime event and wedding",
    to: email,
    subject: "Recived Information",
    html: `<!DOCTYPE html>
    <html lang="en">
    
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
    
        <body>
        <iframe id="inlineFrameExample"
        title="Inline Frame Example"
        width="300"
        height="200"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik">
    </iframe>
        </body>
    
    </html>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    if (info) {
      console.log(info);
    }
  });
};
const sendToAdmin = (information) => {
  const mailOptions = {
    from: "Prime Event Bot",
    to: "primeeventandwedding@gmail.com",
    subject: "New Client",
    html: `<!DOCTYPE html>
    <html lang="en">
    
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
            body{
              padding: 1rem;
            }
            p{
              font-size: 15px;
              text-align: left;
            }</style>
            <title>Document</title>
        </head>
    
        <body>
         <p> Name: ${information.name}</p>
         <br/>
         <p> Email ${information.email}</p>
         <br/>
         <p> Phone:  ${information.phone}</p>
         <br/>
         <p> Event type:  ${information.event_type}</p>
         <br/>
         <p> Details:  ${information.describe}</p>
        <br/>
        <p> Time: ${new Date(information.time).getTime()}</p>
        </body>
    </html>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    if (info) {
      console.log(info);
    }
  });
};
//transfer();
exports.sendToAdmin = sendToAdmin;
exports.reviewFormTomail = reviewFormTomail;
exports.clientRequestResponse = clientRequestResponse;

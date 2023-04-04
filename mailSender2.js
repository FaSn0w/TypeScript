import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eng.fbneves@gmail.com',
        pass: 'number666google'
    }
});


const mailOptions = {
    from: 'eng.fbneves@email.com', // sender address
    to: 'fbi_neves@hotmail.com', // receiver (use array of string for a list)
    subject: 'Email Usando nodemailer', // Subject line
    html: '<p>Html Usando Nodemailer</p>'// plain text body
};


transporter.sendMail(mailOptions, (err, info) => {
    if (err)
        console.log(err)
    else
        console.log(info);
});
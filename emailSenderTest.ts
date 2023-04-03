import nodemailer, { SentMessageInfo } from "nodemailer";



interface Transporter {
    host: string,
    port: number,
    secure: boolean,
    auth: {
        user: string,
        pass: string,
    }
}

const transporterConfig: Transporter = {
    host: "www.host.com.br",
    port: 567,
    secure: false,
    auth: {
        user: "emailTeste@mail.com",
        pass: "123",
    }
}


let transporter = nodemailer.createTransport(transporterConfig);


interface Mail {
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
}

const mail: Mail =
{
    from: `Nome <${transporterConfig.auth.user}>`,
    to: "victordevtb@gmail.com",
    subject: "Oi, sou o Fabrício e estou trabalhando com o nodemailer",
    text: "Olá, sou o Fabrício Neves, e estou gostando bastante da lib Nodemailer",
    html: "Olá meu nome é Fabrício Neves, e eu acho o <a href='https://guiaodprogramador.com'>nodemailer</a> muito legal!",
}


transporter.sendMail(mail).then((message: SentMessageInfo) => {
    console.log(message);
}).catch(err => {
    console.log(err)
})

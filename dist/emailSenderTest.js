"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class Transporter {
    constructor(host, port, secure, auth) {
        this.host = host;
        this.port = port;
        this.secure = secure;
        this.auth = auth;
    }
}
const transporterConfig = new Transporter("smtp.gmail.com", 465, true, {
    user: "eng.fbneves@gmail.com",
    pass: "number666google",
});
let transporter = nodemailer_1.default.createTransport({
    host: transporterConfig.host,
    port: transporterConfig.port,
    secure: transporterConfig.secure,
    auth: transporterConfig.auth,
});
class Mail {
    constructor(from, to, subject, text, html) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
        this.html = html;
    }
}
const mail = new Mail(`Fabricio Neves <${transporterConfig.auth.user}>`, "fbi_neves@hotmail.com", "Oi, sou o Fabrício e estou trabalhando com o nodemailer", "Olá, sou o Fabrício Neves, e estou gostando bastante da lib Nodemailer", "Olá meu nome é Fabrício Neves, e eu acho o <a href='https://guiaodprogramador.com'>nodemailer</a> muito legal!");
transporter.sendMail(mail).then((message) => {
    console.log(message);
}).catch(err => {
    console.log(err);
});


import nodemailer, { SentMessageInfo, TransportOptions } from "nodemailer";

import { google } from "googleapis";

class Transporter {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };

    constructor(host: string, port: number, secure: boolean, auth: { user: string; pass: string }) {
        this.host = host;
        this.port = port;
        this.secure = secure;
        this.auth = auth;
    }
   
}

const transporterConfig = new Transporter(
    "smtp.gmail.com",
    465,
    true, {
    user: "*************",
    pass: "*************",
});



let transporter = nodemailer.createTransport({
    host:transporterConfig.host,
    port:transporterConfig.port,
    secure:transporterConfig.secure,
    auth:transporterConfig.auth,
});

class Mail {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;

    constructor(from: string, to: string, subject: string, text: string, html: string) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
        this.html = html;
    }
}

const mail = new Mail(
    `Fabricio Neves <${transporterConfig.auth.user}>`,
    "fbi_neves@hotmail.com",
    "Oi, sou o Fabrício e estou trabalhando com o nodemailer",
    "Olá, sou o Fabrício Neves, e estou gostando bastante da lib Nodemailer",
    "Olá meu nome é Fabrício Neves, e eu acho o <a href='https://guiaodprogramador.com'>nodemailer</a> muito legal!"
);





// Define as credenciais do OAuth2
const credentials = {
  client: {
    id: "SEU_CLIENT_ID",
    secret: "SUA_CLIENT_SECRET",
  },
  auth: {
    tokenHost: "https://accounts.google.com",
    tokenPath: "/o/oauth2/token",
    authorizePath: "/o/oauth2/auth",
  },
};

// Define o escopo da API do Gmail que será usada
const scopes = [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
];

// Cria o objeto de autenticação OAuth2 com as credenciais e o escopo
const oauth2Client = new google.auth.OAuth2(
  credentials.client.id,
  credentials.client.secret,
  credentials.auth.authorizePath
);

// Gera a URL de autorização para obter o código de acesso
const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});

// Insira o código de acesso aqui para obter o token de acesso e o token de atualização
oauth2Client.getToken("COLOQUE_AQUI_O_CODIGO_DE_ACESSO", async (err, tokens) => {
  if (err) {
    console.error("Erro ao obter token:", err);
    return;
  }

  // Configuração do transporte com as credenciais do OAuth2
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "SEU_EMAIL",
      clientId: credentials.client.id,
      clientSecret: credentials.client.secret,
      refreshToken: tokens.refresh_token,
      accessToken: tokens.access_token,
    },
  });

  // Enviar um email usando o transporte configurado
  try {
    const info = await transporter.sendMail({
      from: "SEU_EMAIL",
      to: "EMAIL_DESTINO",
      subject: "Assunto do email",
      text: "Conteúdo do email",
    });

    console.log("Mensagem enviada:", info);
  } catch (err) {
    console.error("Erro ao enviar mensagem:", err);
  }
});


transporter.sendMail(mail).then((message: SentMessageInfo) => {
    console.log(message);
}).catch(err => {
    console.log(err)
})

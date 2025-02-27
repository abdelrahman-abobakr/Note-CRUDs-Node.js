import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {emailTemplate} from "./emailTemplate.js"

export async function sendEmail(email){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "abdelrahmanabobakr321@gmail.com",
            pass: "tend kvny kfrr hjef",
        }
    });
    const myEmail = jwt.sign(email, "emailKey");
    
    // send mail with defined transport object
    const info = await transporter.sendMail({
    from: '"Maddison Foo Koch " <abdelrahmanabobakr321@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: emailTemplate(myEmail), // html body
    });
    
}

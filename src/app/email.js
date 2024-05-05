import nodemailer from "nodemailer";
import { logger } from "./logging.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bianskiza@gmail.com",
        pass:" ssvs lpku jfkd kzgl"
    }

});

const loginEmailNotification = (sendTo) => {
    transporter.sendMail({
        from: "bianskiza@gmail.com",
        to: sendTo,
        subject: "Login Notification!",
        text: "you hava been login at " + new Date().toDateString(),
        
    }, (error, info)=> {
        if(error) {
            return console.log(error)
        } else {
            logger.info(`message: ${info.response}`)
        }
    });
}

loginEmailNotification("icam.ali.0990@gmail.com")




import nodemailer from "nodemailer";
import { logger } from "./logging.js";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bianskiza@gmail.com",
        pass: process.env.PASS_EMAIL
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

const logoutEmailNotification = (sendTo) => {
    transporter.sendMail({
        from: "bianskiza@gmail.com",
        to: sendTo,
        subject: "Logout Notification!",
        text: "you have been logout at " + new Date().toDateString(),
        
    }, (error, info)=> {
        if(error) {
            return console.log(error)
        } else {
            logger.info(`message: ${info.response}`)
        }
    });
}

export {
    loginEmailNotification,
    logoutEmailNotification
}





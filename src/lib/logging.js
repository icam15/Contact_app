import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

export const logger = winston.createLogger()

if(process.env.MODE_LOG === 'production')  {
    logger.add(new winston.transports.File({
        filename: 'combined.log',
        level: 'info',
        format: winston.format.combine(
            winston.format.label({label: "Production Mode"}),
            winston.format.timestamp(),
            winston.format.json()
        )
    }))
} else {
    logger.add(new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
            winston.format.label({label: "Develop Mode"}),
            winston.format.timestamp(),
            winston.format.simple(),
        )
    }))
}


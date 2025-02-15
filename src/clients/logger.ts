import winston from "winston";

import { join } from "path";

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

const logFormat = winston.format.combine(
	winston.format.timestamp({ format: "HH:mm:ss" }),
	winston.format.errors({ stack: true }),
	winston.format.splat(),
	customFormat
);

const transports: winston.transport[] = [
	new winston.transports.Console({
		format: winston.format.combine(winston.format.colorize(), customFormat),
	}),
];

if (process.env["LOG_SAVE"]?.toLowerCase() === "true") {
	transports.push(
		new winston.transports.File({
			filename: join(process.cwd(), "logs", "error.log"),
			level: "error",
		}),
		new winston.transports.File({
			filename: join(process.cwd(), "logs", "combined.log"),
		})
	);
}

export const logger = winston.createLogger({
	level: process.env["LOG_LEVEL"]?.toLowerCase() || "info",
	format: logFormat,
	transports,
});

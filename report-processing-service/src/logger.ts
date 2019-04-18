import {createLogger, format, transports} from 'winston';

const {combine, timestamp, printf} = format;

const logFormat = printf(({level, message, label, time}) => {
    return `${time} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        logFormat,
    ),
    level: 'info',
    transports: [
        new transports.Console(),
        new transports.File({filename: 'error.log', level: 'error'}),
    ],
});

export default logger;

import { createLogger, format, transports } from "winston";

const logger = createLogger({
    format: format.combine(
        format.splat(),
        format.simple(),
      ),
    level: "info",
    transports: [new transports.Console()],
});

export default logger;

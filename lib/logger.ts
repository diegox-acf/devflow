import pino, { levels } from "pino";

const isEdge = process.env.NEXT_RUNTIME === "edge";
const isProd = process.env.NODE_ENV === "production";

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    !isEdge && !isProd
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:standard",
          },
        }
      : undefined,
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;

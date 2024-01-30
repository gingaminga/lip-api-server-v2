import { LOG, PROJECT } from "@utils/constants";
import colors from "ansi-colors";
import path from "path";
import winston from "winston";
import WinstonDailyLog from "winston-daily-rotate-file";

const { combine, label, printf, splat, timestamp } = winston.format;

const logFormat = printf((info) => {
  let { message, level } = info;

  switch (level) {
    case LOG.LEVEL.ERROR: {
      level = colors.red(level);
      message = colors.red(message);

      break;
    }
    case LOG.LEVEL.WARN: {
      level = colors.yellow(level);
      message = colors.yellow(message);

      break;
    }
    case LOG.LEVEL.INFO: {
      level = colors.green(level);

      break;
    }
    case LOG.LEVEL.DEBUG: {
      level = colors.grey(level);
      message = colors.grey(message);

      break;
    }
    case LOG.LEVEL.HTTP:
    case LOG.LEVEL.VERBOSE:
    case LOG.LEVEL.SILLY:
    default: {
      break;
    }
  }

  return `[${colors.bgRedBright(info.label)}] ${colors.whiteBright(info.timestamp)} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss.SSS",
    }),
    label({ label: PROJECT.NAME }),
    splat(),
    logFormat,
  ),
  transports: [
    new winston.transports.Console({
      level: PROJECT.NODE_ENV === "production" ? LOG.LEVEL.INFO : LOG.LEVEL.DEBUG,
    }),
    new WinstonDailyLog({
      datePattern: "YYYYMMDD",
      dirname: path.resolve(__dirname, LOG.PATH),
      filename: `%DATE%_out.log`,
      level: PROJECT.NODE_ENV === "production" ? LOG.LEVEL.INFO : LOG.LEVEL.DEBUG,
      maxFiles: LOG.MAX_COUNT,
      maxSize: LOG.MAX_SIZE,
      zippedArchive: PROJECT.NODE_ENV !== "development",
    }),
  ],
});

export default logger;

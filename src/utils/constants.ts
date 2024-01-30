export const PROJECT = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 3001), // 서버 포트
  NAME: process.env.PROJECT_NAME || "SAMPLE",
};

export const LOG = {
  LEVEL: {
    ERROR: "error",
    WARN: "warn",
    INFO: "info",
    HTTP: "http",
    VERBOSE: "verbose",
    DEBUG: "debug",
    SILLY: "silly",
  },
  MAX_COUNT: Number(process.env.LOG_MAX_COUNT || 10),
  MAX_SIZE: Number(process.env.LOG_MAX_SIZE || "10m"),
  PATH: process.env.LOG_PATH || "../../logs",
};

export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INVALID_VALUE: 422,
  INTERNAL_SERVER_ERROR: 500,
};

export const SSL = {
  CERT: {
    CA_PATH_AND_FILE: process.env.SSL_CA_PATH_AND_FILE || "",
    CERT_PATH_AND_FILE: process.env.SSL_CERT_PATH_AND_FILE || "",
    KEY_PATH_AND_FILE: process.env.SSL_KEY_PATH_AND_FILE || "",
  },
  PFX: {
    PFX_PATH_AND_FILE: process.env.SSL_PFX_PATH_AND_FILE || "",
    PASSWORD: process.env.SSL_PFX_PASSWORD || "",
  },
  TYPE: process.env.SSL_TYPE || "",
  USED: process.env.HTTPS === "true",
};

export const CORS_CONFIG = {
  credentials: true,
  origin: "*",
};

export const RESPONSE_STATUS = {
  FAILURE: "failure",
  SUCCESS: "success",
};

export const REDIS = {
  HOST: process.env.REDIS_HOST || "127.0.0.1",
  PASSWORD: process.env.REDIS_PASSWORD,
  PORT: Number(process.env.REDIS_PORT || 6379),
};

export const RELATION_DB = {
  HOST: process.env.RELATION_DB_HOST || "127.0.0.1",
  PASSWORD: process.env.RELATION_DB_PASSWORD,
  PORT: Number(process.env.RELATION_DB_PORT || 3306),
  SCHEMA: process.env.RELATION_DB_SCHEMA || "",
  TYPE: process.env.RELATION_DB_TYPE || "mysql",
  USER_NAME: process.env.RELATION_DB_USER_NAME || "",
};

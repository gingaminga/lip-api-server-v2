declare namespace NodeJS {
  interface ProcessEnv {
    HTTPS: "true" | "false";
    JWT_KEY: string;
    LOG_MAX_COUNT: number;
    LOG_MAX_SIZE: string;
    LOG_PATH: string;
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    PROJECT_NAME: string;
    REDIS_HOST: string;
    REDIS_PASSWORD: string;
    REDIS_PORT: number;
    RELATION_DB_HOST: string;
    RELATION_DB_PASSWORD: string;
    RELATION_DB_PORT: number;
    RELATION_DB_SCHEMA: string;
    RELATION_DB_TYPE: "mysql";
    RELATION_DB_USER_NAME: string;
    SOCIAL_GOOGLE_KEY: string;
    SOCIAL_GOOGLE_SECRET_KEY: string;
    SOCIAL_KAKAO_KEY: string;
    SOCIAL_KAKAO_SECRET_KEY: string;
    SOCIAL_NAVER_KEY: string;
    SOCIAL_NAVER_SECRET_KEY: string;
    SOCIAL_REDIRECT_URI: string;
    SSL_CA_PATH_AND_FILE: string | undefined;
    SSL_CERT_PATH_AND_FILE: string | undefined;
    SSL_KEY_PATH_AND_FILE: string | undefined;
    SSL_PFX_PATH_AND_FILE: string | undefined;
    SSL_PFX_PASSWORD: string;
    SSL_TYPE: "crt" | "pfx";
  }
}

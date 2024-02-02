import { SOCIAL } from "@utils/constants";

export const GOOGLE_URL = {
  REDIRECT_URL: `${SOCIAL.REDIRECT_URI}/callback/google`,
  AUTH: {
    HOST: "https://accounts.google.com",
    PATH: {
      AUTHORIZE: "/o/oauth2/v2/auth",
    },
  },
};

export const KAKAO_URL = {
  REDIRECT_URL: `${SOCIAL.REDIRECT_URI}/callback/kakao`,
  AUTH: {
    HOST: "https://kauth.kakao.com",
    PATH: {
      AUTHORIZE: "/oauth/authorize",
    },
  },
};

export const NAVER_URL = {
  REDIRECT_URL: `${SOCIAL.REDIRECT_URI}/callback/naver`,
  AUTH: {
    HOST: "https://nid.naver.com",
    PATH: {
      AUTHORIZE: "/oauth2.0/authorize",
    },
  },
};

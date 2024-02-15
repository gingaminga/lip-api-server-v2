import relationDBOption from "@config/orm.config";
import RelationDBClient from "@my-rdb/client";
import Social from "@utils/social/common";
import Google from "@utils/social/google";
import Kakao from "@utils/social/kakao";
import Naver from "@utils/social/naver";
import { GOOGLE_URL, KAKAO_URL, NAVER_URL } from "@utils/social/url";
import { AxiosBase } from "axios-classification";

const googleApiInstance = new AxiosBase({
  baseURL: GOOGLE_URL.API.HOST,
});

const googleAuthInstance = new AxiosBase({
  baseURL: GOOGLE_URL.AUTH.HOST1,
});

const kakaoApiInstance = new AxiosBase({
  baseURL: KAKAO_URL.API.HOST,
});

const kakaoAuthInstance = new AxiosBase({
  baseURL: KAKAO_URL.AUTH.HOST,
});

const naverApiInstance = new AxiosBase({
  baseURL: NAVER_URL.API.HOST,
});

const naverAuthInstance = new AxiosBase({
  baseURL: NAVER_URL.AUTH.HOST,
});

export const socialGoogle = new Google(googleApiInstance, googleAuthInstance);
export const socialKakao = new Kakao(kakaoApiInstance, kakaoAuthInstance);
export const socialNaver = new Naver(naverApiInstance, naverAuthInstance);
export const socialUtil = new Social(socialGoogle, socialKakao, socialNaver);
export const rdbUtil = new RelationDBClient(relationDBOption);

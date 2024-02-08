interface IKakaoAccountProfileUserInfo {
  is_default_image?: boolean;
  nickname?: string;
  profile_image_url?: string;
  thumbnail_image_url?: string;
}

interface IKakaoPropertyUserInfo {
  nickname: string;
}

interface IKakaoAccountUserInfo {
  age_range_needs_agreement?: boolean;
  age_range?: string; // 연령대
  birthday?: string; // 생일 (MMDD)
  birthday_needs_agreement?: boolean;
  birthday_type?: string; // 생일 타입 (양력/음력)
  birthyear?: string; // 출생연도 (YYYY 형식)
  birthyear_needs_agreement?: boolean;
  ci?: string;
  ci_authenticated_at?: Date;
  ci_needs_agreement?: boolean;
  email?: string;
  email_needs_agreement?: boolean;
  gender?: string;
  gender_needs_agreement?: boolean;
  has_email?: boolean;
  is_email_valid?: boolean;
  is_email_verified?: boolean;
  name?: string; // 닉네임
  name_needs_agreement?: boolean;
  phone_number?: string;
  phone_number_needs_agreement?: boolean;
  profile?: IKakaoAccountProfileUserInfo;
  profile_image_needs_agreement?: boolean;
  profile_needs_agreement?: boolean;
  profile_nickname_needs_agreement?: boolean;
}

interface IKakaoPartnerUserInfo {
  uuid: string;
}

export interface IResponseGetUserInfo {
  connected_at?: Date;
  for_partner?: IKakaoPartnerUserInfo;
  has_signed_up?: boolean;
  id: number;
  kakao_account?: IKakaoAccountUserInfo;
  properties?: IKakaoPropertyUserInfo;
  synched_at?: Date;
}

export interface IRequestGetToken {
  client_id: string;
  client_secret: string;
  code: string;
  grant_type: string;
  redirect_uri: string;
}

export interface IResponseGetToken {
  access_token: string;
  expires_in: number; // 액세스토큰 만료시간(초)
  id_token?: string;
  refresh_token: string;
  refresh_token_expires_in: number; // 리프레시토큰 만료시간(초)
  scope?: string;
  token_type: string; // bearer 고정
}

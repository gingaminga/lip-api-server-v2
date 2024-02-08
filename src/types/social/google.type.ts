export interface IResponseGetUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
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
  refresh_token?: string;
  scope?: string;
  token_type: string; // bearer 고정
}

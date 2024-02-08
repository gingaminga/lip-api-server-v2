interface INaverUserInfo {
  age: string;
  birth: string;
  birthyear: string;
  email: string;
  gender: string;
  id: string;
  mobile: string;
  name: string;
  nickname: string;
  profile_image: string;
}

export interface IResponseGetUserInfo {
  message: string;
  response: INaverUserInfo;
  resultcode: string;
}

export interface IRequestGetToken {
  client_id: string;
  client_secret: string;
  code: string;
  grant_type: string;
  state: string;
}

export interface IResponseGetToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  error: string;
  error_description: string;
}

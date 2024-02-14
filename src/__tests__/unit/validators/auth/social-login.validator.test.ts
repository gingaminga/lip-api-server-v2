import SocialLoginParamDTO from "@dto/params/auth/social-login.param.dto";
import { ResponseDTO } from "@my-types/express.type";
import { TSocialType } from "@my-types/social.type";
import { socialLoginSchema, socialLoginValidator } from "@validators/auth/social-login.validator";
import { Request } from "express";

describe(`Social login validator test :)`, () => {
  const req = {
    body: {},
  } as Request;
  const res = {
    locals: {
      requestDTO: {},
    },
  } as unknown as ResponseDTO<SocialLoginParamDTO>;
  const next = jest.fn();

  beforeEach(() => {
    req.body = {};
  });

  it(`should be invalidate by type`, async () => {
    // given
    req.body.type = "10";
    const error = new Error("Invalidate params");
    jest.spyOn(socialLoginSchema, "validateAsync").mockRejectedValue(error);

    // when & then
    await expect(async () => {
      await socialLoginValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be invalidate by code`, async () => {
    // given
    req.body.code = "";
    const error = new Error("Invalidate params");
    jest.spyOn(socialLoginSchema, "validateAsync").mockRejectedValue(error);

    // when & then
    await expect(async () => {
      await socialLoginValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be validate.`, async () => {
    // given
    req.body.type = "kakao";
    req.body.code = "1234567890";
    const params = {
      code: "1234567890",
      type: "kakao" as TSocialType,
    };
    const dto = new SocialLoginParamDTO(params);

    // when
    await socialLoginValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(next).toHaveBeenCalled();
  });
});

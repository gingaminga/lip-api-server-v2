import GetSocialURLParamDTO from "@dto/params/social/get-social-url.param.dto";
import { ResponseDTO } from "@my-types/express.type";
import { TSocialType } from "@my-types/social.type";
import { SOCIAL } from "@utils/constants";
import { getSocialURLSchema, getSocialURLValidator } from "@validators/social/get-social-url.validator";
import { Request } from "express";

describe(`Get social url validator test :)`, () => {
  const req = {
    query: {},
  } as Request;
  const res = {
    locals: {
      requestDTO: {},
    },
  } as unknown as ResponseDTO<GetSocialURLParamDTO>;
  const next = jest.fn();

  beforeEach(() => {
    req.query = {};
  });

  it(`should be invalidate by type`, async () => {
    // given
    req.query.type = "10";
    const error = new Error("Invalidate params");
    jest.spyOn(getSocialURLSchema, "validateAsync").mockRejectedValue(error);

    // when & then
    await expect(async () => {
      await getSocialURLValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be validate by type equal ${SOCIAL.KAKAO.NAME}.`, async () => {
    // given
    req.query.type = "kakao";
    const params = {
      type: "kakao" as TSocialType,
    };
    const dto = new GetSocialURLParamDTO(params);
    jest.spyOn(getSocialURLSchema, "validateAsync").mockResolvedValue(dto);

    // when
    await getSocialURLValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(next).toHaveBeenCalled();
  });
});

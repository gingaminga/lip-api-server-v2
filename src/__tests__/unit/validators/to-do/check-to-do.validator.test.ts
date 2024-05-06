import CheckToDoParamDTO from "@dto/params/to-do/check-to-do.param.dto";
import { ResponseDTO } from "@my-types/express.type";
import { checkToDoBodySchema, checkToDoPathSchema, checkToDoValidator } from "@validators/to-do/check-to-do.validator";
import { Request } from "express";

describe(`Check to do validator test :)`, () => {
  const req = {
    body: {},
    params: {},
  } as Request;
  const res = {
    locals: {
      requestDTO: {},
    },
  } as unknown as ResponseDTO<CheckToDoParamDTO>;
  const next = jest.fn();

  beforeEach(() => {
    req.body = {};
    req.params = {};
  });

  it(`should be invalidate by isChecked params`, async () => {
    // given
    req.params.id = String(1);
    const error = new Error('"isChecked" is required');
    // jest.spyOn(checkToDoBodySchema, "validateAsync").mockRejectedValue(error);

    // when & then
    await expect(async () => {
      await checkToDoValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be invalidate by id params`, () => {
    // given
    req.body.isChecked = true;
    const error = new Error('"id" is required');

    // when & then
    expect(async () => {
      await checkToDoValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be validate.`, async () => {
    // given
    const isChecked = true;
    const id = 1;
    req.body.isChecked = isChecked;
    req.params.id = String(id);
    const bodyParams = {
      isChecked,
    };
    const pathParams = {
      id,
    };
    const dto = new CheckToDoParamDTO({
      ...bodyParams,
      ...pathParams,
    });

    // when
    await checkToDoValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(next).toHaveBeenCalled();
  });
});

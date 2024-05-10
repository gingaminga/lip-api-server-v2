import ModifyMemoParamDTO from "@dto/params/to-do/modify-memo.param.dto";
import { ResponseDTO } from "@my-types/express.type";
import { modifyMemoValidator } from "@validators/to-do/modify-memo.validator";
import { Request } from "express";

describe(`Modify to do memo validator test :)`, () => {
  const req = {
    body: {},
    params: {},
  } as Request;
  const res = {
    locals: {
      requestDTO: {},
    },
  } as unknown as ResponseDTO<ModifyMemoParamDTO>;
  const next = jest.fn();

  beforeEach(() => {
    req.body = {};
    req.params = {};
  });

  it(`should be invalidate by memo params`, async () => {
    // given
    req.params.id = "1";
    const error = new Error('"memo" is required');

    // when & then
    await expect(async () => {
      await modifyMemoValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be invalidate by id params`, () => {
    // given
    req.body.memo = "test memo";
    const error = new Error('"id" is required');

    // when & then
    expect(async () => {
      await modifyMemoValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be validate.`, async () => {
    // given
    const memo = "test memo";
    const id = 1;
    const bodyParams = {
      memo,
    };
    const pathParams = {
      id,
    };
    const dto = new ModifyMemoParamDTO({
      ...bodyParams,
      ...pathParams,
    });
    req.body.memo = memo;
    req.params.id = String(id);

    // when
    await modifyMemoValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(next).toHaveBeenCalled();
  });
});

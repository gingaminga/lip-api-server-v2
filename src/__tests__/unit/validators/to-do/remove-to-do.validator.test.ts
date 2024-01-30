import RemoveToDoParamDTO from "@dto/params/to-do/remove-to-do.param.dto";
import { ResponseDTO } from "@my-types/express.type";
import { removeToDoSchema, removeToDoValidator } from "@validators/to-do/remove-to-do.validator";
import { Request } from "express";

describe(`Modify to do content validator test :)`, () => {
  const req = {
    params: {},
  } as Request;
  const res = {
    locals: {
      requestDTO: {},
    },
  } as unknown as ResponseDTO<RemoveToDoParamDTO>;
  const next = jest.fn();
  const id = 1;

  beforeEach(() => {
    req.params = {};
  });

  it(`should be invalidate by id params`, async () => {
    // given
    const error = new Error('"id" is required');

    // when & then
    await expect(async () => {
      await removeToDoValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be validate.`, async () => {
    // given
    req.params.id = String(id);
    const params = {
      id,
    };
    const dto = new RemoveToDoParamDTO(params);

    jest.spyOn(removeToDoSchema, "validateAsync").mockResolvedValue(params);

    // when
    await removeToDoValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(next).toHaveBeenCalled();
  });
});

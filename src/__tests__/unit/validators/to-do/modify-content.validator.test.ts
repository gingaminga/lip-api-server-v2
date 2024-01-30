import ModifyContentParamDTO from "@dto/params/to-do/modify-content.param.dto";
import { ResponseDTO } from "@my-types/express.type";
import { addToDoSchema, addToDoValidator } from "@validators/to-do/add-to-do.validator";
import {
  modifyContentBodySchema,
  modifyContentPathSchema,
  modifyContentValidator,
} from "@validators/to-do/modify-content.validator";
import { Request } from "express";

describe(`Modify to do content validator test :)`, () => {
  const req = {
    body: {},
    params: {},
  } as Request;
  const res = {
    locals: {
      requestDTO: {},
    },
  } as unknown as ResponseDTO<ModifyContentParamDTO>;
  const next = jest.fn();
  const content = "Test new content";
  const id = 1;

  beforeEach(() => {
    req.body = {};
    req.params = {};
  });

  it(`should be invalidate by content params`, async () => {
    // given
    const error = new Error("Invalidate content params");
    jest.spyOn(modifyContentBodySchema, "validateAsync").mockRejectedValue(error);

    // when & then
    await expect(async () => {
      await modifyContentValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be invalidate by id params`, () => {
    // given
    const bodyParams = {
      content,
    };
    jest.spyOn(modifyContentBodySchema, "validateAsync").mockResolvedValue(bodyParams);

    const error = new Error("Invalidate id params");
    jest.spyOn(modifyContentPathSchema, "validateAsync").mockRejectedValue(error);

    // when & then
    expect(async () => {
      await modifyContentValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be validate.`, async () => {
    // given
    req.body.content = content;
    req.params.id = String(id);
    const bodyParams = {
      content,
    };
    const pathParams = {
      id,
    };
    const dto = new ModifyContentParamDTO({
      ...bodyParams,
      ...pathParams,
    });

    jest.spyOn(modifyContentBodySchema, "validateAsync").mockResolvedValue(bodyParams);
    jest.spyOn(modifyContentPathSchema, "validateAsync").mockResolvedValue(pathParams);

    // when
    await modifyContentValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(next).toHaveBeenCalled();
  });
});

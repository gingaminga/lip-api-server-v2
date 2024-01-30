import AddToDoParamDTO from "@dto/params/to-do/add-to-do.param.dto";
import { ResponseDTO } from "@my-types/express.type";
import { addToDoSchema, addToDoValidator } from "@validators/to-do/add-to-do.validator";
import { Request } from "express";

describe(`Add to do validator test :)`, () => {
  const req = {
    body: {},
  } as Request;
  const res = {
    locals: {
      requestDTO: {},
    },
  } as unknown as ResponseDTO<AddToDoParamDTO>;
  const next = jest.fn();
  const content = "Test content";
  const date = "2024-01-01";

  beforeEach(() => {
    req.body = {};
  });

  it(`should be invalidate by content params`, async () => {
    // given
    req.body.date = date;
    const error = new Error("Invalidate params");
    jest.spyOn(addToDoSchema, "validateAsync").mockRejectedValue(error);

    // when & then
    await expect(async () => {
      await addToDoValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be invalidate by date params`, () => {
    // given
    req.body.content = content;
    const error = new Error("Invalidate params");
    jest.spyOn(addToDoSchema, "validateAsync").mockRejectedValue(error);

    // when & then
    expect(async () => {
      await addToDoValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be validate.`, async () => {
    // given
    req.body.content = content;
    req.body.date = date;
    const dto = new AddToDoParamDTO(req.body);
    jest.spyOn(addToDoSchema, "validateAsync").mockResolvedValue(dto);

    // when
    await addToDoValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(next).toHaveBeenCalled();
  });
});

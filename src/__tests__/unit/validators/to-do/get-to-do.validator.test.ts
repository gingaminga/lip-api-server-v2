import GetToDoParamDTO from "@dto/params/to-do/get-to-do.param.dto";
import { ResponseDTO } from "@my-types/express.type";
import { getToDoValidator } from "@validators/to-do/get-to-do.validator";
import { Request } from "express";

describe(`Get to do validator test :)`, () => {
  const req = {
    query: {},
  } as Request;
  const res = {
    locals: {
      requestDTO: {},
    },
  } as unknown as ResponseDTO<GetToDoParamDTO>;
  const next = jest.fn();

  beforeEach(() => {
    req.query = {};
  });

  it(`should be required by startDate params`, async () => {
    // given
    req.query.endDate = "2024-01-01";
    const error = new Error('"startDate" is required');

    // when & then
    await expect(async () => {
      await getToDoValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be invalidate by startDate params`, async () => {
    // given
    req.query.endDate = "2024-01-01";
    req.query.startDate = "???";
    const error = new Error('"startDate" must be in ISO 8601 date format');

    // when & then
    await expect(async () => {
      await getToDoValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be required by endDate params`, () => {
    // given
    req.query.startDate = "2024-01-01";
    const error = new Error('"endDate" is required');

    // when & then
    expect(async () => {
      await getToDoValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be invalidate by endDate params`, () => {
    // given
    req.query.endDate = "???";
    req.query.startDate = "2024-01-01";
    const error = new Error('"endDate" must be in ISO 8601 date format');

    // when & then
    expect(async () => {
      await getToDoValidator(req, res, next);
    }).rejects.toThrow(error);
    expect(next).not.toHaveBeenCalled();
  });

  it(`should be validate.`, async () => {
    // given
    const params = {
      endDate: "2024-04-10",
      startDate: "2024-04-01",
    };
    req.query.endDate = params.endDate;
    req.query.startDate = params.startDate;

    const dto = new GetToDoParamDTO(params);

    // when
    await getToDoValidator(req, res, next);

    // then
    expect(res.locals.requestDTO).toEqual(dto);
    expect(next).toHaveBeenCalled();
  });
});

import { getRandomText } from "@utils/util";

describe(`[Util] getRandomText method test :)`, () => {
  it("should be a random string of default digits.", () => {
    const text = getRandomText();

    expect(text).toHaveLength(15);
    // expect(error.code).toBe(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  });

  it("should be a random string of 10 digits.", () => {
    const text = getRandomText(10);

    expect(text).toHaveLength(10);
    // expect(error.code).toBe(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
  });

  it("should be a random string of 20 digits.", () => {
    const text = getRandomText(20);

    expect(text).toHaveLength(20);
  });
});

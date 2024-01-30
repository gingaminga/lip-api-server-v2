import { InfoService } from "@services/info.service";
import os from "os";

jest.mock("os");
const mockedHostnameFn = jest.mocked(os.hostname);

describe(`[Info service] info method test :)`, () => {
  let infoService: InfoService;
  let memory: boolean;
  let name: boolean;
  let uptime: boolean;
  const FREE_MEMORY = 10;
  const TOTAL_MEMORY = 100;
  const HOST_NAME = "TEST";
  const UPTIME = 500;

  beforeEach(() => {
    mockedHostnameFn.mockReturnValue(HOST_NAME);
    infoService = new InfoService();
    memory = false;
    name = false;
    uptime = false;
  });

  it(`should only memory info`, () => {
    // given
    memory = true;

    const freememSpy = jest.spyOn(os, "freemem").mockReturnValue(FREE_MEMORY);
    const totalmemSpy = jest.spyOn(os, "totalmem").mockReturnValue(TOTAL_MEMORY);

    // when
    const serverInfo = infoService.info(memory, name, uptime);

    // then
    expect(freememSpy).toHaveBeenCalled();
    expect(totalmemSpy).toHaveBeenCalled();
    expect(serverInfo.freeMemory).toBe(FREE_MEMORY);
    expect(serverInfo.totalMemory).toBe(TOTAL_MEMORY);
    expect(serverInfo.hostName).toBeUndefined();
    expect(serverInfo.uptime).toBeUndefined();
  });

  it(`should only name info`, () => {
    // given
    name = true;

    // when
    const serverInfo = infoService.info(memory, name, uptime);

    // then
    expect(serverInfo.hostName).toBe(HOST_NAME);
    expect(serverInfo.freeMemory).toBeUndefined();
    expect(serverInfo.totalMemory).toBeUndefined();
    expect(serverInfo.uptime).toBeUndefined();
  });

  it(`should only uptime info`, () => {
    // given
    uptime = true;

    const uptimeSpy = jest.spyOn(os, "uptime").mockReturnValue(UPTIME);

    // when
    const serverInfo = infoService.info(memory, name, uptime);

    // then
    expect(uptimeSpy).toHaveBeenCalled();
    expect(serverInfo.uptime).toBe(UPTIME);
    expect(serverInfo.freeMemory).toBeUndefined();
    expect(serverInfo.totalMemory).toBeUndefined();
    expect(serverInfo.hostName).toBeUndefined();
  });

  it(`should memory, name info`, () => {
    // given
    memory = true;
    name = true;

    const freememSpy = jest.spyOn(os, "freemem").mockReturnValue(FREE_MEMORY);
    const totalmemSpy = jest.spyOn(os, "totalmem").mockReturnValue(TOTAL_MEMORY);
    mockedHostnameFn.mockReturnValue("TEST");

    // when
    const serverInfo = infoService.info(memory, name, uptime);

    // then
    expect(freememSpy).toHaveBeenCalled();
    expect(totalmemSpy).toHaveBeenCalled();
    expect(serverInfo.freeMemory).toBe(FREE_MEMORY);
    expect(serverInfo.totalMemory).toBe(TOTAL_MEMORY);
    expect(serverInfo.hostName).toBe(HOST_NAME);
    expect(serverInfo.uptime).toBeUndefined();
  });

  it(`should memory, uptime info`, () => {
    // given
    memory = true;
    uptime = true;

    const freememSpy = jest.spyOn(os, "freemem").mockReturnValue(FREE_MEMORY);
    const totalmemSpy = jest.spyOn(os, "totalmem").mockReturnValue(TOTAL_MEMORY);
    const uptimeSpy = jest.spyOn(os, "uptime").mockReturnValue(UPTIME);

    // when
    const serverInfo = infoService.info(memory, name, uptime);

    // then
    expect(freememSpy).toHaveBeenCalled();
    expect(totalmemSpy).toHaveBeenCalled();
    expect(uptimeSpy).toHaveBeenCalled();
    expect(serverInfo.freeMemory).toBe(FREE_MEMORY);
    expect(serverInfo.totalMemory).toBe(TOTAL_MEMORY);
    expect(serverInfo.uptime).toBe(UPTIME);
    expect(serverInfo.hostName).toBeUndefined();
  });

  it(`should name, uptime info`, () => {
    // given
    name = true;
    uptime = true;

    mockedHostnameFn.mockReturnValue("TEST");
    const uptimeSpy = jest.spyOn(os, "uptime").mockReturnValue(UPTIME);

    // when
    const serverInfo = infoService.info(memory, name, uptime);

    // then
    expect(uptimeSpy).toHaveBeenCalled();
    expect(serverInfo.hostName).toBe(HOST_NAME);
    expect(serverInfo.uptime).toBe(UPTIME);
    expect(serverInfo.freeMemory).toBeUndefined();
    expect(serverInfo.totalMemory).toBeUndefined();
  });

  it(`should all info`, () => {
    // given
    memory = true;
    name = true;
    uptime = true;

    const freememSpy = jest.spyOn(os, "freemem").mockReturnValue(FREE_MEMORY);
    const totalmemSpy = jest.spyOn(os, "totalmem").mockReturnValue(TOTAL_MEMORY);
    const uptimeSpy = jest.spyOn(os, "uptime").mockReturnValue(UPTIME);
    mockedHostnameFn.mockReturnValue("TEST");

    // when
    const serverInfo = infoService.info(memory, name, uptime);

    // then
    expect(freememSpy).toHaveBeenCalled();
    expect(totalmemSpy).toHaveBeenCalled();
    expect(uptimeSpy).toHaveBeenCalled();
    expect(serverInfo.freeMemory).toBe(FREE_MEMORY);
    expect(serverInfo.totalMemory).toBe(TOTAL_MEMORY);
    expect(serverInfo.hostName).toBe(HOST_NAME);
    expect(serverInfo.uptime).toBe(UPTIME);
  });
});

import InfoDTO from "@dto/info.dto";
import { injectable } from "inversify";
import os from "os";

export interface IInfoService {
  info(memory?: boolean, name?: boolean, uptime?: boolean): InfoDTO;
}

@injectable()
export class InfoService implements IInfoService {
  hostName = os.hostname();

  info(memory?: boolean, name?: boolean, uptime?: boolean) {
    let freeMemory: number | undefined;
    let totalMemory: number | undefined;
    let hostName: string | undefined;
    let time: number | undefined;

    if (memory) {
      freeMemory = os.freemem();
      totalMemory = os.totalmem();
    }

    if (name) {
      hostName = this.hostName;
    }

    if (uptime) {
      time = os.uptime();
    }

    return new InfoDTO(hostName, totalMemory, freeMemory, time);
  }
}

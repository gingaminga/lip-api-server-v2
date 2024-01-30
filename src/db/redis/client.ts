import logger from "@config/logger.config";
import { IConnectionOption } from "@my-types/redis.type";
import CError from "@utils/error";
import ERROR_MESSAGE from "@utils/error-message";
import colors from "ansi-colors";
import { createClient } from "redis";

class RedisClient {
  private instance!: ReturnType<typeof createClient>;

  private isConnect = false;

  private name = "Redis";

  /**
   * @description 연결 상태 확인하기
   */
  private checkConnect() {
    if (!this.getIsConnect()) {
      throw new CError(ERROR_MESSAGE.NOT_CONNECT_REDIS);
    }
  }

  /**
   * @description ping-pong 확인하기
   */
  private async checkPingPong() {
    logger.info(`[${this.getName()}] ${colors.blue("PING")}...`);

    const instance = this.getInstance();
    const pong = await instance.ping();

    logger.info(`[${this.getName()}] ${colors.blue(pong)} :)`);
  }

  /**
   * @description 연결하기
   * @param options connection option
   */
  private async connect(options: IConnectionOption) {
    const { host, name, port, password } = options;

    const connectionOption = {
      password,
      reconnectStrategy() {
        return 3000;
      },
      socket: {
        host,
        port,
      },
    };

    const instance = createClient(connectionOption);
    await instance.connect();

    this.setInstance(instance);
    this.setName(name);
    this.registerEvent(instance);
  }

  /**
   * @description 값 삭제하기
   * @param key 키
   */
  async del(key: string) {
    this.checkConnect();

    const instance = this.getInstance();
    const count = await instance.del(key);

    logger.debug(`[${this.getName()}] Deleted ${count} ${key} keys`);
  }

  /**
   * @description 값 가져오기
   * @param key 키
   * @returns 값
   */
  async get(key: string) {
    this.checkConnect();

    const instance = this.getInstance();
    const value = await instance.get(key);

    if (typeof value !== "string") {
      logger.warn(`[${this.getName()}] Get ${key} key has no value`);

      return null;
    }

    return value;
  }

  /**
   * @description instance 가져오기
   * @returns redis instance
   */
  private getInstance() {
    return this.instance;
  }

  /**
   * @description isConnect 가져오기
   * @returns boolean
   */
  getIsConnect() {
    return this.isConnect;
  }

  /**
   * @description name 가져오기
   * @returns 이름
   */
  getName() {
    return this.name;
  }

  /**
   * @description 해쉬값 삭제하기
   * @param key 키
   * @param field 필드
   */
  async hdel(key: string, field: string) {
    this.checkConnect();

    const instance = this.getInstance();
    const count = await instance.hDel(key, field);
    logger.debug(`[${this.getName()}] Deleted hash ${count} ${key}-${field} key-field`);
  }

  /**
   * @description 해시값 가져오기
   * @param key 키
   * @param field 필드
   * @returns 값
   */
  async hget(key: string, field: string) {
    this.checkConnect();

    const instance = this.getInstance();
    const value = await instance.hGet(key, field);

    if (typeof value !== "string") {
      logger.warn(`[${this.getName()}] Get hash ${key}-${field} key-field has no value`);

      return null;
    }

    return value;
  }

  /**
   * @description 해시값 추가하기
   * @param key 키
   * @param field 필드
   * @param value 값
   */
  async hset(key: string, field: string, value: string) {
    this.checkConnect();

    const instance = this.getInstance();
    const count = await instance.hSet(key, field, value);
    logger.debug(`[${this.getName()}] Added hash ${count} ${key}-${field} key-field`);
  }

  /**
   * @description 이벤트
   */
  private registerEvent(instance: ReturnType<typeof createClient>) {
    instance.on("connect", () => {
      logger.info(`[${this.getName()}] ${colors.grey("connect")}`);
    });

    instance.on("ready", () => {
      logger.info(`[${this.getName()}] ${colors.green("ready")}`);

      this.checkPingPong();
    });

    instance.on("end", () => {
      logger.info(`[${this.getName()}] ${colors.grey("end")}`);
    });

    instance.on("error", (error) => {
      logger.error(`[${this.getName()}] error \n %o`, error);
    });

    instance.on("reconnecting", () => {
      logger.info(`[${this.getName()}] ${colors.magenta("reconnecting")}`);
    });
  }

  /**
   * @description 값 추가하기
   * @param key 키
   * @param value 값
   */
  async set(key: string, value: string) {
    this.checkConnect();

    const instance = this.getInstance();
    const result = await instance.set(key, value);

    logger.debug(`[${this.getName()}] Added ${result} result by ${key}`);
  }

  /**
   * @description isConnect 설정하기
   * @param status 상태값
   */
  protected setIsConnect(status: boolean) {
    this.isConnect = status;
  }

  /**
   * @description name 설정하기
   * @param name 이름
   */
  protected setName(name?: string) {
    if (name) {
      this.name = name;
    }
  }

  /**
   * @description instance 설정하기
   * @param instance 이름
   */
  private setInstance(instance: ReturnType<typeof createClient>) {
    this.instance = instance;
  }

  /**
   * @description 시작하기
   * @param options connection option
   */
  async start(options: IConnectionOption) {
    await this.connect(options);
    await this.checkPingPong();
    this.setIsConnect(true);
  }

  /**
   * @description 종료하기
   */
  async stop() {
    const instance = this.getInstance();
    await instance.disconnect();
    this.setIsConnect(false);
  }
}

export default RedisClient;

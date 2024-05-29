import GetRoutineToDoParamDTO from "@dto/params/routine/to-do/get-routine-to-do.param.dto";
import User from "@my-rdb/entities/user.entity";
import { RoutineToDoRepository } from "@my-rdb/repositories/routine-to-do.repository";
import { RoutineRepository } from "@my-rdb/repositories/routine.repository";
import INVERSIFY_TYPES from "@utils/invesify-type";
import { inject, injectable } from "inversify";

export interface IRoutineToDoService {
  get(params: GetRoutineToDoParamDTO, userInfo: User): Promise<any>;
}

@injectable()
export class RoutineToDoService implements IRoutineToDoService {
  private routineToDoRepository;

  private routineRepository;

  constructor(
    @inject(INVERSIFY_TYPES.ToDoRepository) routineToDoRepository: typeof RoutineToDoRepository,
    @inject(INVERSIFY_TYPES.RoutineRepository) routineRepository: typeof RoutineRepository,
  ) {
    this.routineToDoRepository = routineToDoRepository;
    this.routineRepository = routineRepository;
  }

  /**
   * @description 루틴 할 일 가져오기
   * @param params dto
   * @param userInfo 유저 정보
   */
  async get(params: GetRoutineToDoParamDTO, userInfo: User) {
    // nothing to do..
  }
}

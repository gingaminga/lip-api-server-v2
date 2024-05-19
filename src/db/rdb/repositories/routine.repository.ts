import { rdbUtil } from "@loaders/util.loader";
import Routine from "@my-rdb/entities/routine.entity";
import { FindOptionsRelations } from "typeorm";

export const RoutineRepository = rdbUtil.getRepository(Routine).extend({
  /**
   * @description 루틴 찾기
   * @param routineID
   * @param userID
   * @param relations relation 허용 객체
   */
  async findRoutine(routineID: number, userID: number, relations: FindOptionsRelations<Routine>) {
    const routine = await this.findOne({
      where: {
        id: routineID,
        user: {
          id: userID,
        },
      },
      relations,
    });

    return routine;
  },
  /**
   * @description 루틴 삭제하기
   * @param routineID
   * @param userID
   */
  async remove(routineID: number, userID: number) {
    const result = await this.softDelete({
      id: routineID,
      user: {
        id: userID,
      },
    });

    if (result.affected && result.affected > 0) {
      return true;
    }

    return false;
  },
});

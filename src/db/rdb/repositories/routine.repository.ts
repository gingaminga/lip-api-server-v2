import { rdbUtil } from "@loaders/util.loader";
import Routine from "@my-rdb/entities/routine.entity";

export const RoutineRepository = rdbUtil.getRepository(Routine).extend({
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

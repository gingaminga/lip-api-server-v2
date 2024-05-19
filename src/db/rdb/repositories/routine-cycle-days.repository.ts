import { rdbUtil } from "@loaders/util.loader";
import RoutineCycleDays from "@my-rdb/entities/routine-cycle-days.entity";

export const RoutineCycleDaysRepository = rdbUtil.getRepository(RoutineCycleDays).extend({
  /**
   * @description 루틴 주기 삭제하기
   * @param routineID
   */
  async remove(routineID: number) {
    const result = await this.softDelete({
      id: routineID,
    });

    if (result.affected && result.affected > 0) {
      return true;
    }

    return false;
  },
});

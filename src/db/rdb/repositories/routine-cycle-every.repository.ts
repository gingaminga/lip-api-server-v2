import { rdbUtil } from "@loaders/util.loader";
import RoutineCycleEvery from "@my-rdb/entities/routine-cycle-every.entity";

export const RoutineCycleEveryRepository = rdbUtil.getRepository(RoutineCycleEvery).extend({
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

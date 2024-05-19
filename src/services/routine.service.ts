import AddRoutineByDaysParamDTO from "@dto/params/routine/add-routine-by-days.param.dto";
import AddRoutineByEveryParamDTO from "@dto/params/routine/add-routine-by-every.param.dto";
import ModifyRoutineByDaysParamDTO from "@dto/params/routine/modify-routine-by-days.param.dto";
import ModifyRoutineByEveryParamDTO from "@dto/params/routine/modify-routine-by-every.param.dto";
import RemoveRoutineParamDTO from "@dto/params/routine/remove-routine.param.dto";
import AddRoutineResponseDTO from "@dto/responses/routine/add-routine.response.dto";
import ModifyRoutineResponseDTO from "@dto/responses/routine/modify-routine.response.dto";
import RemoveRoutineResponseDTO from "@dto/responses/routine/remove-routine.response.dto";
import { rdbUtil } from "@loaders/util.loader";
import RoutineCycleDays from "@my-rdb/entities/routine-cycle-days.entity";
import RoutineCycleEvery from "@my-rdb/entities/routine-cycle-every.entity";
import Routine from "@my-rdb/entities/routine.entity";
import User from "@my-rdb/entities/user.entity";
import { RoutineCycleDaysRepository } from "@my-rdb/repositories/routine-cycle-days.repository";
import { RoutineCycleEveryRepository } from "@my-rdb/repositories/routine-cycle-every.repository";
import { RoutineRepository } from "@my-rdb/repositories/routine.repository";
import { getExistDay } from "@utils/date";
import INVERSIFY_TYPES from "@utils/invesify-type";
import { inject, injectable } from "inversify";

export interface IRoutineService {
  addRoutineByDays(dto: AddRoutineByDaysParamDTO, userInfo: User): Promise<AddRoutineResponseDTO>;
  addRoutineByEvery(dto: AddRoutineByEveryParamDTO, userInfo: User): Promise<AddRoutineResponseDTO>;
  modifyRoutineByDays(dto: ModifyRoutineByDaysParamDTO, userInfo: User): Promise<ModifyRoutineResponseDTO>;
  modifyRoutineByEvery(dto: ModifyRoutineByEveryParamDTO, userInfo: User): Promise<ModifyRoutineResponseDTO>;
  remove(dto: RemoveRoutineParamDTO, userInfo: User): Promise<RemoveRoutineResponseDTO>;
}

@injectable()
export class RoutineService implements IRoutineService {
  private routineRepository;

  private routineCycleDaysRepository;

  private routineCycleEveryRepository;

  constructor(
    @inject(INVERSIFY_TYPES.RoutineRepository) routineRepository: typeof RoutineRepository,
    @inject(INVERSIFY_TYPES.RoutineCycleDaysRepository) routineCycleDaysRepository: typeof RoutineCycleDaysRepository,
    @inject(INVERSIFY_TYPES.RoutineCycleEveryRepository)
    routineCycleEveryRepository: typeof RoutineCycleEveryRepository,
  ) {
    this.routineRepository = routineRepository;
    this.routineCycleDaysRepository = routineCycleDaysRepository;
    this.routineCycleEveryRepository = routineCycleEveryRepository;
  }

  async addRoutineByDays(params: AddRoutineByDaysParamDTO, userInfo: User) {
    const { color, days, description = null, endDate = null, startDate, title } = params;
    const { friday, monday, saturday, sunday, thursday, tuesday, wednesday } = getExistDay(days);

    const routineCycleDays = new RoutineCycleDays();
    routineCycleDays.monday = monday;
    routineCycleDays.tuesday = tuesday;
    routineCycleDays.wednesday = wednesday;
    routineCycleDays.thursday = thursday;
    routineCycleDays.friday = friday;
    routineCycleDays.saturday = saturday;
    routineCycleDays.sunday = sunday;

    const routine = new Routine();
    routine.title = title;
    routine.description = description;
    routine.color = color;
    routine.startDate = startDate;
    routine.endDate = endDate;
    routine.user = userInfo;
    routine.routineCycleDays = routineCycleDays;

    const newRoutine = await this.routineRepository.save(routine);

    const dto = new AddRoutineResponseDTO(newRoutine);
    return dto;
  }

  async addRoutineByEvery(params: AddRoutineByEveryParamDTO, userInfo: User) {
    const { color, description = null, endDate = null, every, startDate, title } = params;

    const routineCycleEvery = new RoutineCycleEvery();
    routineCycleEvery.every = every;

    const routine = new Routine();
    routine.title = title;
    routine.description = description;
    routine.color = color;
    routine.startDate = startDate;
    routine.endDate = endDate;
    routine.user = userInfo;
    routine.routineCycleEvery = routineCycleEvery;

    const newRoutine = await this.routineRepository.save(routine);

    const dto = new AddRoutineResponseDTO(newRoutine);
    return dto;
  }

  async modifyRoutineByDays(params: ModifyRoutineByDaysParamDTO, userInfo: User) {
    const { color, days, description = null, endDate = null, id, startDate, title } = params;
    const { friday, monday, saturday, sunday, thursday, tuesday, wednesday } = getExistDay(days);

    return rdbUtil.transaction(async (manager) => {
      const routineRepository = manager.withRepository(this.routineRepository);
      const routineCycleEveryRepository = manager.withRepository(this.routineCycleEveryRepository);

      const currentRoutine = await routineRepository.findRoutine(id, userInfo.id, {
        routineCycleDays: true,
        routineCycleEvery: true,
      });

      const routineCycleDays = new RoutineCycleDays();
      routineCycleDays.monday = monday;
      routineCycleDays.tuesday = tuesday;
      routineCycleDays.wednesday = wednesday;
      routineCycleDays.thursday = thursday;
      routineCycleDays.friday = friday;
      routineCycleDays.saturday = saturday;
      routineCycleDays.sunday = sunday;

      if (currentRoutine?.routineCycleDays) {
        routineCycleDays.id = currentRoutine.routineCycleDays.id;
      }

      const routine = new Routine();
      routine.id = id;
      routine.title = title;
      routine.description = description;
      routine.color = color;
      routine.startDate = startDate;
      routine.endDate = endDate;
      routine.user = userInfo;
      routine.routineCycleDays = routineCycleDays;
      routine.routineCycleEvery = null;

      const routineInfo = await this.routineRepository.save(routine);

      if (currentRoutine?.routineCycleEvery) {
        await routineCycleEveryRepository.softDelete({
          id: currentRoutine.routineCycleEvery.id,
        });
      }

      const dto = new ModifyRoutineResponseDTO(routineInfo);
      return dto;
    });
  }

  async modifyRoutineByEvery(params: ModifyRoutineByEveryParamDTO, userInfo: User) {
    const { color, description = null, endDate = null, every, id, startDate, title } = params;

    return rdbUtil.transaction(async (manager) => {
      const routineRepository = manager.withRepository(this.routineRepository);
      const routineCycleDaysRepository = manager.withRepository(this.routineCycleDaysRepository);

      const currentRoutine = await routineRepository.findRoutine(id, userInfo.id, {
        routineCycleDays: true,
        routineCycleEvery: true,
      });

      const routineCycleEvery = new RoutineCycleEvery();
      routineCycleEvery.every = every;

      if (currentRoutine?.routineCycleEvery) {
        routineCycleEvery.id = currentRoutine.routineCycleEvery.id;
      }

      const routine = new Routine();
      routine.id = id;
      routine.title = title;
      routine.description = description;
      routine.color = color;
      routine.startDate = startDate;
      routine.endDate = endDate;
      routine.user = userInfo;
      routine.routineCycleDays = null;
      routine.routineCycleEvery = routineCycleEvery;

      const routineInfo = await this.routineRepository.save(routine);

      if (currentRoutine?.routineCycleDays) {
        await routineCycleDaysRepository.softDelete({
          id: currentRoutine.routineCycleDays.id,
        });
      }

      const dto = new ModifyRoutineResponseDTO(routineInfo);
      return dto;
    });
  }

  async remove(params: RemoveRoutineParamDTO, userInfo: User) {
    const { id } = params;

    return rdbUtil.transaction(async (manager) => {
      const routineRepository = manager.withRepository(this.routineRepository);
      const routineCycleDaysRepository = manager.withRepository(this.routineCycleDaysRepository);
      const routineCycleEveryRepository = manager.withRepository(this.routineCycleEveryRepository);

      const currentRoutine = await routineRepository.findRoutine(id, userInfo.id, {
        routineCycleDays: true,
        routineCycleEvery: true,
      });

      if (currentRoutine?.routineCycleDays) {
        await routineCycleDaysRepository.remove(currentRoutine.routineCycleDays.id);
      }

      if (currentRoutine?.routineCycleEvery) {
        await routineCycleEveryRepository.remove(currentRoutine.routineCycleEvery.id);
      }

      const isSuccess = await this.routineRepository.remove(id, userInfo.id);
      const removeID = isSuccess ? id : -1;

      const dto = new RemoveRoutineResponseDTO(removeID);
      return dto;
    });
  }
}

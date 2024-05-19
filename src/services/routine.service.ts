import AddRoutineByDaysParamDTO from "@dto/params/routine/add-routine-by-days.param.dto";
import AddRoutineByEveryParamDTO from "@dto/params/routine/add-routine-by-every.param.dto";
import AddRoutineResponseDTO from "@dto/responses/routine/add-routine.response.dto";
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
}

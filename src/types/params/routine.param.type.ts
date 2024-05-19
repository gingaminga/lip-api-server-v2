export interface ICommonAddRoutineParam {
  color: string;
  description?: string;
  endDate?: string;
  startDate: string;
  title: string;
}

export interface IAddRoutineByDaysParam extends ICommonAddRoutineParam {
  days: string; // 요일
}

export interface IAddRoutineByEveryParam extends ICommonAddRoutineParam {
  every: number; // 주기
}

export interface IAddCommonRoutineParam {
  color: string;
  description?: string;
  endDate?: string;
  startDate: string;
  title: string;
}

export interface IAddRoutineByDaysParam extends IAddCommonRoutineParam {
  days: string; // 요일
}

export interface IAddRoutineByEveryParam extends IAddCommonRoutineParam {
  every: number; // 주기
}

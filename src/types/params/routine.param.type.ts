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

export interface IModifyRoutineByDaysParam extends IAddRoutineByDaysParam {
  id: number;
}

export interface IModifyRoutineByEveryParam extends IAddRoutineByEveryParam {
  id: number;
}

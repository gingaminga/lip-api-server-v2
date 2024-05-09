export interface IAddToDoParam {
  content: string;
  date: string;
}

export interface ICheckToDoBodyParam {
  isChecked: boolean;
}

export interface ICheckToDoPathParam {
  id: number;
}

export interface ICheckToDoParam extends ICheckToDoBodyParam, ICheckToDoPathParam {}

export interface IGetToDoParam {
  endDate: string;
  startDate: string;
}

export interface IModifyContentBodyParam {
  content: string;
}

export interface IModifyContentPathParam {
  id: number;
}

export interface IModifyContentParam extends IModifyContentBodyParam, IModifyContentPathParam {}

export interface IModifyMemoBodyParam {
  memo: string;
}

export interface IModifyMemoPathParam {
  id: number;
}

export interface IModifyMemoParam extends IModifyMemoBodyParam, IModifyMemoPathParam {}

export interface IRemoveToDoParam {
  id: number;
}

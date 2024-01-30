export interface IAddToDoParam {
  content: string;
  date: string;
}

export interface IModifyContentBodyParam {
  content: string;
}

export interface IModifyContentPathParam {
  id: number;
}

export interface IModifyContentParam extends IModifyContentBodyParam, IModifyContentPathParam {}

export interface IRemoveToDoParam {
  id: number;
}

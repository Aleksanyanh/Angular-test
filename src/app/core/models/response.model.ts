import { HttpStatusCodesEnum } from '@app/core/enums/status-code.enum';

export interface IResponseData<T> {
  data: T;
  statusCode: HttpStatusCodesEnum;
}

export interface IListResult<T> {
  items: T[];
  hasNext?: boolean;
}

export interface IEnvironment {
  production: boolean;
  apiUrl: string;
}

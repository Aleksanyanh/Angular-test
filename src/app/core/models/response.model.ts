import { HttpStatusCodesEnum } from '@app/core/enums/status-code.enum';

export interface IResponseData<T> {
  data: T;
  statusCode: HttpStatusCodesEnum;
}

export interface IEnvironment {
  production: boolean;
  apiUrl: string;
}

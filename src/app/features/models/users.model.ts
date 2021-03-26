export class UsersReqViewModel {
  userSearch = '';
}

export interface IUsersResModel {
  id: string;
  avatar_url: string;
  login: string;
  type: string;
}

export interface IUsersReqDTO {
  q: string;
}

export interface IUsersResDTO {
  items: IUsersResModel[];
  hasNext: boolean;
}

export interface IUsersState {
  userList: IUsersResModel[];
  hasNext: boolean;
}

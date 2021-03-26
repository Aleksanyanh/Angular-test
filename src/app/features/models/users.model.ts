export class UsersFilterViewModel {
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
  filterData: UsersFilterViewModel;
  userList: IUsersResModel[];
  hasNext: boolean;
}

export class UsersFilterViewModel {
  userSearch = '';
}

export interface IUsersReqDTO {
  q: string;
}

export interface IUsersResModel {
  id: number;
  avatar_url: string;
  login: string;
  type: string;
}

export interface IUsersResDTO {
  items: IUsersResModel[];
  total_count: number;
  incomplete_results: boolean;
}

export interface IUsersState {
  filterData: UsersFilterViewModel;
  userList: IUsersResModel[];
  totalCount: number;
  imageModal: boolean;
  currentImage: string;
  hasNext: boolean;
}

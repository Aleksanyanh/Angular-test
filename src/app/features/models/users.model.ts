import { PagingViewModel } from "@app/core/models/page.model";

export class UsersFilterViewModel {
  paging = new PagingViewModel({
    selectedOption: 10,
    options: [10, 20, 30, 50],
  });
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

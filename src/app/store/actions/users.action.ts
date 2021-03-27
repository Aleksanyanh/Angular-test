import { UsersFilterViewModel } from '@app/features/models/users.model';

export class GetUsers {
  static readonly type = '[Users] GetUsers';
}

export class FilterUsers {
  static readonly type = '[Users] FilterUsers';
  constructor(public filterData: UsersFilterViewModel) {}
}

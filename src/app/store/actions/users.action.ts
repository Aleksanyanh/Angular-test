import { UsersFilterViewModel } from '@app/features/models/users.model';

export class GetUsers {
  static readonly type = '[Users] GetUsers';
  constructor(public filterData: UsersFilterViewModel) {}
}

import { UsersFilterViewModel } from '@app/features/models/users.model';

export class InitUsers {
  static readonly type = '[Users] InitUsers';
}
export class FilterUsers {
  static readonly type = '[Users] FilterUsers';
  constructor(public filterData: UsersFilterViewModel) {}
}
export class ToggleUserImageModal {
  static readonly type = '[Users] ToggleUserImageModal';
  constructor(public imageModal: boolean) {}
}
export class SetCurrentUserImage {
  static readonly type = '[Users] SetCurrentUserImage';
  constructor(public currentImage: string) {}
}

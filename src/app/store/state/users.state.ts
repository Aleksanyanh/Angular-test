import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { tap } from 'rxjs/operators';
import { IResponseData } from '@app/core/models/response.model';

import { IUsersResDTO, IUsersState, UsersFilterViewModel } from '@app/features/models/users.model';
import { UsersRepoService } from '@app/core/repos/users.repo';
import { UsersEffectService } from '@app/store/effects/users.effect';
import { GetUsers } from '@app/store/actions/users.action';

const defaults: IUsersState = {
  filterData: new UsersFilterViewModel(),
  userList: [],
  hasNext: false,
};

@State<IUsersState>({
  name: 'mediaRoomReport',
  defaults,
})
@Injectable()
export class MediaRoomReportState {
  constructor(private usersRepoService: UsersRepoService, private usersEffectService: UsersEffectService) {}

  @Selector()
  static usersState(state: IUsersState): IUsersState {
    return state;
  }

  @Selector()
  static filterData(state: IUsersState): UsersFilterViewModel {
    return state.filterData;
  }

  @Action(GetUsers)
  getUsers({ patchState }: StateContext<IUsersState>, { filterData }: GetUsers) {
    const params = this.usersEffectService.filterUsersEffect(filterData);

    return this.usersRepoService.getUsersRepo(params).pipe(
      tap((response: IResponseData<IUsersResDTO>) => {
        patchState({
          userList: response.data.items,
          hasNext: response.data.hasNext,
        });
      })
    );
  }
}

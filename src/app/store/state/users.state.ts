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
  totalCount: 0,
  hasNext: false,
};

@State<IUsersState>({
  name: 'users',
  defaults,
})
@Injectable()
export class UsersState {
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
      tap((response: IUsersResDTO) => {
        patchState({
          userList: response.items,
          totalCount: response.total_count,
          hasNext: response.incomplete_results,
        });
      })
    );
  }
}

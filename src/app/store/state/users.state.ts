import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { tap } from 'rxjs/operators';
import { IUsersResDTO, IUsersState, UsersFilterViewModel } from '@app/features/models/users.model';
import { UsersRepoService } from '@app/core/repos/users.repo';
import { UsersEffectService } from '@app/store/effects/users.effect';
import {
  FilterUsers,
  InitUsers,
  LoadUsers,
  SetCurrentUserImage,
  ToggleUserImageModal,
} from '@app/store/actions/users.action';
import { cloneDeep } from 'lodash';

const defaults: IUsersState = {
  filterData: new UsersFilterViewModel(),
  userList: [],
  totalCount: 0,
  imageModal: false,
  currentImage: null,
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

  // =================================> INIT DATA (START) =================================>
  @Action(InitUsers)
  initUsers({ patchState }: StateContext<IUsersState>) {
    patchState({
      filterData: new UsersFilterViewModel(),
      userList: [],
      totalCount: 0,
      imageModal: false,
      currentImage: null,
      hasNext: false,
    });
  }
  // =================================> INIT DATA (END) =================================>

  // =================================> FILTER LIST (START) =================================>
  @Action(FilterUsers, { cancelUncompleted: true })
  filterUsers({ patchState }: StateContext<IUsersState>, { filterData }: FilterUsers) {
    const params = this.usersEffectService.filterUsersEffect(filterData);

    return this.usersRepoService.filterUsersRepo(params).pipe(
      tap((response: IUsersResDTO) => {
        patchState({
          userList: response.items,
          totalCount: response.total_count,
          hasNext: !response.incomplete_results,
        });
      })
    );
  }
  // =================================> FILTER LIST (END) =================================>

  // =================================> LOAD DATA (START) =================================>
  @Action(LoadUsers, { cancelUncompleted: true })
  loadUsers({ patchState, getState }: StateContext<IUsersState>, { filterData }: LoadUsers) {
    const state = getState();
    const _userList = cloneDeep(state.userList);

    const params = this.usersEffectService.filterUsersEffect(filterData);
    return this.usersRepoService.filterUsersRepo(params).pipe(
      tap((response: IUsersResDTO) => {
        const userList = [..._userList, ...response.items];

        patchState({
          userList,
          hasNext: !response.incomplete_results,
        });
      })
    );
  }
  // =================================> LOAD DATA (END) =================================>

  // =================================> TOGGLE ITEM (START) =================================>
  @Action(ToggleUserImageModal)
  toggleUserImageModal({ patchState }: StateContext<IUsersState>, { imageModal }: ToggleUserImageModal) {
    return patchState({
      imageModal,
    });
  }
  // =================================> TOGGLE ITEM (END) =================================>

  // =================================> SET ITEM (START) =================================>
  @Action(SetCurrentUserImage)
  setCurrentUserImage({ patchState }: StateContext<IUsersState>, { currentImage }: SetCurrentUserImage) {
    return patchState({
      currentImage,
    });
  }
  // =================================> SET ITEM (END) =================================>
}

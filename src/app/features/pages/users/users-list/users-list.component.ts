import { Component, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActionsExecuting, actionsExecuting } from '@ngxs-labs/actions-executing';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UsersState } from '@app/store/state/users.state';
import { FilterUsers, LoadUsers, SetCurrentUserImage, ToggleUserImageModal } from '@app/store/actions/users.action';
import { IUsersResModel, IUsersState, UsersFilterViewModel } from '@app/features/models/users.model';
import { LOADING_LOTTIE } from '@app/core/constants/image';
import { cloneDeep } from 'lodash';
import { FeatureComponentEnum } from '@app/core/enums/component.enum';
import { SubjectService } from '@app/features/services/subject.service';

@UntilDestroy()
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  @Select(actionsExecuting([FilterUsers])) Loading$: Observable<ActionsExecuting>;
  usersState: IUsersState;
  filterData: UsersFilterViewModel;
  FeatureComponentEnum = FeatureComponentEnum;
  isPageEmpty = true;
  loadingLottie = LOADING_LOTTIE;

  constructor(private store: Store, private subjectService: SubjectService) {
    this.subjectService.loadPageSub.pipe(untilDestroyed(this)).subscribe((componentEnum: FeatureComponentEnum) => {
      if (componentEnum === FeatureComponentEnum.users) {
        // this.subjectService.scrollPageSub.next(true);
        this.filterData.paging.skip = this.usersState.userList.length;
        this.store.dispatch(new LoadUsers(this.filterData));
      }
    });
  }

  onToggleImageModal(bool: boolean, image: string): void {
    this.store.dispatch([new SetCurrentUserImage(image), new ToggleUserImageModal(bool)]);
  }

  trackByID(_: number, data: IUsersResModel): number {
    return data.id;
  }

  ngOnInit(): void {
    this.store
      .select(UsersState.usersState)
      .pipe(filter(Boolean), untilDestroyed(this))
      .subscribe((data: IUsersState) => {
        this.checkListIsEmpty(data.userList);
        this.usersState = data;
      });

    this.store
      .select(UsersState.filterData)
      .pipe(filter(Boolean), untilDestroyed(this))
      .subscribe((data: UsersFilterViewModel) => {
        this.filterData = cloneDeep(data);
      });
  }

  private checkListIsEmpty = (list: IUsersResModel[]) => {
    if (list.length) {
      this.isPageEmpty = false;
    } else {
      this.isPageEmpty = true;
    }
  };
}

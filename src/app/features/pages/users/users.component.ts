import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Select, Store } from '@ngxs/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { ActionsExecuting, actionsExecuting } from '@ngxs-labs/actions-executing';
import { Observable } from 'rxjs';
import { NotificationsService } from '@app/core/services/notification.service';
import { NotificationEnum } from '@app/core/enums/notification.enum';
import { GetUsers } from '@app/store/actions/users.action';
import { IUsersResModel, IUsersState, UsersFilterViewModel } from '@app/features/models/users.model';
import { LOADING_LOTTIE, RESET_FILTER_ICON } from '@app/core/constants/image';
import { UsersState } from '@app/store/state/users.state';
import { NO_WHITE_SPACE } from '@app/core/constants/regexp';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('pageView') pageView: ElementRef<HTMLDivElement>;

  @Select(actionsExecuting([GetUsers])) Loading$: Observable<ActionsExecuting>;
  usersState: IUsersState;
  filterData = new UsersFilterViewModel();
  filterForm: FormGroup = this.fb.group({
    userSearch: [
      '',
      [Validators.required, Validators.pattern(NO_WHITE_SPACE), Validators.minLength(2), Validators.maxLength(30)],
    ],
  });
  isPageEmpty = false;
  hasError = false;
  loadingLottie = LOADING_LOTTIE;
  resetFiltericon = RESET_FILTER_ICON;

  constructor(
    public fb: FormBuilder,
    private store: Store,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  onUpdateFilter(): void {
    this.store.dispatch(new GetUsers(this.filterData)).subscribe(this.successResCB, this.errorResCB);
  }

  onResetFilter() {
    this.filterForm.reset();
    this.store.dispatch(new GetUsers(this.filterData)).subscribe(this.successResCB, this.errorResCB);
  }

  ngOnInit(): void {
    this.store
      .select(UsersState.usersState)
      .pipe(filter(Boolean), untilDestroyed(this))
      .subscribe((data: IUsersState) => {
        this.usersState = data;
      });

    this.store
      .select(UsersState.filterData)
      .pipe(filter(Boolean), untilDestroyed(this))
      .subscribe((data: UsersFilterViewModel) => {
        debugger;
        this.filterData = cloneDeep(data);
      });
  }

  private successResCB = (state: any) => {
    this.hasError = false;

    if (state.users.userList.length) {
      this.isPageEmpty = false;
    } else {
      this.isPageEmpty = true;
    }
  };

  private errorResCB = (err: HttpErrorResponse) => {
    this.hasError = true;
    this.notificationsService.notify(NotificationEnum.Error, 'ERROR (Users) ====>', `${err}`);
    console.log('ERROR (Users) ====>', err);
  };
}

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
import { LOADING_LOTTIE } from '@app/core/constants/image';
import { UsersState } from '@app/store/state/users.state';
import { NO_WHITE_SPACE } from '@app/core/constants/regexp';

// import { SubjectService } from '@app/features/services/subject.service';
// import { ScrollOptionsViewModel } from '@app/core/models/page.model';

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
  isPageEmpty = true;
  hasError = false;
  loadingLottie = LOADING_LOTTIE;
  // scrollButtonState = false;
  // scrollOptions: any = new ScrollOptionsViewModel();

  constructor(
    public fb: FormBuilder,
    private store: Store,
    private router: Router,
    // private subjectService: SubjectService,
    private notificationsService: NotificationsService
  ) {
    // this.subjectService.loadPageSub.pipe(untilDestroyed(this)).subscribe((componentEnum: FeatureComponentEnum) => {
    //   if (componentEnum === FeatureComponentEnum.Users) {
    //     this.scrollButtonState = true;
    //     this.scrollOptions = new ScrollOptionsViewModel();
    //     this.filterData.paging.skip = this.UsersState.userList.length;
    //     this.store.dispatch(new LoadUsers(this.filterData));
    //   }
    // });
  }

  onUpdateFilter(): void {
    // this.scrollButtonState = false;
    this.store.dispatch(new GetUsers(this.filterData)).subscribe(this.successResCB, this.errorResCB);
  }

  onResetFilter(): void {
    // this.scrollButtonState = false;
    this.filterForm.reset();
    this.store.dispatch(new GetUsers(this.filterData)).subscribe(this.successResCB, this.errorResCB);
  }

  trackByID(_: number, data: IUsersResModel): number {
    return data.id;
  }

  // onScrollDown() {
  //   this.pageView.nativeElement.scrollIntoView(this.scrollOptions);
  //   this.scrollOptions =
  //     this.scrollOptions.block === 'end'
  //       ? new ScrollOptionsViewModel({ block: 'start' })
  //       : new ScrollOptionsViewModel({ block: 'end' });
  // }

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
        this.filterData = cloneDeep(data);
      });
  }

  private successResCB = (state: any): void => {
    this.hasError = false;

    if (state.users.userList.length) {
      this.isPageEmpty = false;
    } else {
      this.isPageEmpty = true;
    }
  };

  private errorResCB = (err: HttpErrorResponse): void => {
    this.hasError = true;
    this.notificationsService.notify(NotificationEnum.Error, 'ERROR (Users) ====>', `${err.message}`);
    console.log('ERROR (Users) ====>', err.message);
  };
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { cloneDeep } from 'lodash';
import { filter } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { NotificationsService } from '@app/core/services/notification.service';
import { NotificationEnum } from '@app/core/enums/notification.enum';
import { GetUsers } from '@app/store/actions/users.action';
import { UsersFilterViewModel } from '@app/features/models/users.model';
import { UsersState } from '@app/store/state/users.state';
import { NO_WHITE_SPACE } from '@app/core/constants/regexp';

@UntilDestroy()
@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements OnInit {
  filterData = new UsersFilterViewModel();

  filterForm: FormGroup = this.fb.group({
    userSearch: [
      '',
      [Validators.required, Validators.pattern(NO_WHITE_SPACE), Validators.minLength(2), Validators.maxLength(30)],
    ],
  });

  constructor(
    public fb: FormBuilder,
    private store: Store,
    // private subjectService: SubjectService,
    // private featuresService: FeaturesService,
    private notificationsService: NotificationsService
  ) {}

  onUpdateFilter(): void {
    // this.subjectService.scrollPageSub.next(false);
    this.filterForm.markAllAsTouched();

    if (this.filterForm.valid) {
      this.store.dispatch(new GetUsers(this.filterData)).subscribe(this.successResCB, this.errorResCB);
    } else {
      this.filterForm.reset();
      this.notificationsService.notify(NotificationEnum.Warning, 'WARNING (Users filter) ====>', 'Form is not valid!');
    }
  }

  onResetFilter(): void {
    // this.subjectService.scrollPageSub.next(false);
    this.filterForm.reset();
    this.store.dispatch(new GetUsers(this.filterData)).subscribe(this.successResCB, this.errorResCB);
  }

  ngOnInit(): void {
    this.store
      .select(UsersState.filterData)
      .pipe(filter(Boolean), untilDestroyed(this))
      .subscribe((data: UsersFilterViewModel) => {
        this.filterData = cloneDeep(data);
      });
  }

  private successResCB = (state: any): void => {
    // this.subjectService.hasHttpErrorSub.next(false);

    if (state.users.userList.length) {
      // this.subjectService.isPageEmptySub.next(false);
    } else {
      // this.subjectService.isPageEmptySub.next(true);
    }
  };

  private errorResCB = (err: HttpErrorResponse): void => {
    // this.subjectService.hasHttpErrorSub.next(true);

    this.notificationsService.notify(NotificationEnum.Error, 'HTTP ERROR (Users filter) ====>', `${err.message}`);
    console.log('HTTP ERROR (Users filter) ====>', err.message);
  };
}

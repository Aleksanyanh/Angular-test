import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.modules';
import { UsersRoutingModule } from '@app/features/pages/users/users.routing.module';
import { UsersComponent } from '@app/features/pages/users/users.component';
import { UsersListComponent } from '@app/features/pages/users/users-list/users-list.component';
import { UsersFilterComponent } from '@app/features/pages/users/users-filter/users-filter.component';

@NgModule({
  declarations: [UsersComponent, UsersListComponent, UsersFilterComponent],
  imports: [SharedModule, UsersRoutingModule],
  providers: [],
})
export class UsersModule {}

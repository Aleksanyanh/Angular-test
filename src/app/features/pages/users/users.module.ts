import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.modules';
import { UsersRoutingModule } from '@app/features/pages/users/users.routing.module';
import { UsersComponent } from '@app/features/pages/users/users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [SharedModule, UsersRoutingModule],
  providers: [],
})
export class UsersModule {}

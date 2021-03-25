import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from '@app/auth/pages/login/login.component';

@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [AuthRoutingModule],
})
export class AuthModule {}

import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.modules';
import { DashboardRoutingModule } from '@app/features/pages/dashboard/dashboard.routing.module';
import { DashboardComponent } from '@app/features/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [SharedModule, DashboardRoutingModule],
  providers: [],
})
export class DashboardModule {}

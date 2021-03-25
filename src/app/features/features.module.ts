import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.modules';
import { FeaturesComponent } from '@app/features/features.component';
import { FeaturesRoutingModule } from '@app/features/features.routing.module';

@NgModule({
  declarations: [FeaturesComponent],
  imports: [SharedModule, FeaturesRoutingModule],
  providers: [],
})
export class FeaturesModule {}

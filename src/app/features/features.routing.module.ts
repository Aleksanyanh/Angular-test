import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturesComponent } from '@app/features/features.component';
import { FEATURES, DASHBOARD } from '@app/core/constants/path';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: DASHBOARD,
        loadChildren: () =>
          import(`./pages/${DASHBOARD}/${DASHBOARD}.module`).then((m) => m.DashboardModule),
      },
      {
        path: '',
        redirectTo: DASHBOARD,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}

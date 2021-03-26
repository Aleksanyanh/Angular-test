import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturesComponent } from '@app/features/features.component';
import { FEATURES, USERS } from '@app/core/constants/path';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: USERS,
        loadChildren: () =>
          import(`./pages/${USERS}/${USERS}.module`).then((m) => m.UsersModule),
      },
      {
        path: '',
        redirectTo: USERS,
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AUTH, FEATURES } from '@app/core/constants/path';

const routes: Routes = [
  {
    path: '',
    redirectTo: FEATURES,
    pathMatch: 'full',
  },
  {
    path: AUTH,
    loadChildren: () => import(`../${AUTH}/${AUTH}.module`).then((m) => m.AuthModule),
  },
  {
    path: FEATURES,
    loadChildren: () => import(`../${FEATURES}/${FEATURES}.module`).then((m) => m.FeaturesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

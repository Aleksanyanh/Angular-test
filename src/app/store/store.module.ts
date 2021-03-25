import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';
import { environment } from '@environments/environment';

@NgModule({
  imports: [
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),

    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsActionsExecutingModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: ['auth'],
    }),
  ],
  exports: [NgxsModule],
})
export class StoreModule {}

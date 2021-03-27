import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';
import { environment } from '@environments/environment';
import { UsersState } from '@app/store/state/users.state';

const states = [UsersState];

@NgModule({
  imports: [
    NgxsModule.forRoot(states, {
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

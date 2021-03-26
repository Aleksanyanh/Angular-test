import { Injectable } from '@angular/core';

import { createParams } from '@app/core/utils/params.util';
import { UsersFilterViewModel } from '@app/features/models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersEffectService {
  filterUsersEffect(data: UsersFilterViewModel): string {
    let userSearch = null;

    if (data.userSearch.trim()) {
      userSearch = data.userSearch;
    }

    const reqData = {
      userSearch,
    };

    return createParams(reqData);
  }
}

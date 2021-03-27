import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUsersResDTO } from '@app/features/models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersRepoService {
  constructor(private http: HttpClient) {}

  getUsersRepo(params: string) {
    const url = `/search/users?${params}`;
    return this.http.get<IUsersResDTO>(url);
  }
}

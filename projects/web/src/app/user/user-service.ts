import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './user';
import { environment } from '../../environments/environment';
import { concatOp, httpMutation, HttpMutationOptions } from '@angular-architects/ngrx-toolkit';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  getUser() {
    return this.httpClient.get<User | null>(
      `${environment.apiServerUrl}/api/v1/account/find/profile`,
    );
  }

  createUserMutation(options: Partial<HttpMutationOptions<Partial<User>, User>>) {
    return httpMutation({
      ...options,
      request: (user) => ({
        url: `${environment.apiServerUrl}/api/v1/account`,
        method: "POST",
        body: user
      }),
      operator: concatOp
    })
  }
}

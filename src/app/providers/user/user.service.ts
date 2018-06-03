import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new User();

  constructor(private httpClient: HttpClient) { }

  getById(id: number): Observable<User> {
    return this.httpClient.get<User>('https://jsonplaceholder.typicode.com/users/' + id);
  }

  getAll(page?: number, limit?: number): Observable<User[]> {

    page = (isNaN(page) || page < 1) ? 1 : page;
    limit = (isNaN(limit) || limit < 0) ? 10 : limit;

    return this.httpClient.get<User[]>(
      'https://jsonplaceholder.typicode.com/users/?_page=' + page + '&_limit=' + limit
    );
  }

  login(username, password): Observable<User> {
    return this.httpClient.post<User>('https://jsonplaceholder.typicode.com/users', {
      username, password
    }).pipe(
      map((response: User) => {
        this.user = response;
        return response;
      }),
      catchError(error => {
        this.user = new User();
        return of(error);
      })
    );
  }

  isLoggedIn(): Boolean {
    return this.user.id > 0;
  }

  getUser(): User {
    return this.user;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  geById(id: number): Observable<any> {
    return this.httpClient.get<User>('https://jsonplaceholder.typicode.com/users/' + id);
  }

  getAll(page: number, limit: number) {

    page = (isNaN(page) || page < 0) ? 0 : page;
    limit = (isNaN(limit) || limit < 0) ? 10 : limit;

    return this.httpClient.get<User>(
      'https://jsonplaceholder.typicode.com/users/?_page=' + page + '&_limit=' + limit
    );
  }
}

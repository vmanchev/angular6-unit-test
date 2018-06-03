import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Item } from '../../models/item.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  add(item: Item) {
    return this.httpClient.post('https://jsonplaceholder.typicode.com/posts', item);
  }

  getAll(): Observable<Item[]> {
    return this.httpClient.get<Item[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getById(id: number): Observable<Item> {
    return this.httpClient.get<Item>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  update(item: Item) {
    return this.httpClient.put(`https://jsonplaceholder.typicode.com/posts/${item.id}`, item);
  }

  remove(id: number) {
    return this.httpClient.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  getUserItems(): Observable<Item[]> {

    if (!this.userService.isLoggedIn()) {
      throw 'AUTH.ERROR.REQUIRED';
    }

    const user = this.userService.getUser();

    return this.httpClient.get<Item[]>(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
  }
}

import { TestBed, inject } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemService } from './item.service';
import { UserService } from '../user/user.service';
import { Item } from '../../models/item.model';
import { User } from '../../models/user.model';

const ItemMock = {
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
} as Item;

let loggedInFlag = false;

const UserMock = {
  id: 1
} as User;

class UserServiceMock {
  isLoggedIn() {
    return loggedInFlag;
  }

  getUser() {
    return UserMock;
  }
}


describe('ItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ItemService,
        { provide: UserService, useClass: UserServiceMock }
      ]
    });
  });

  it('should be created', inject([ItemService], (service: ItemService) => {
    expect(service).toBeTruthy();
  }));


  describe('add', function () {

    it('should perform a POST request to save a new item',
      inject([HttpTestingController, ItemService], (httpMock: HttpTestingController, service: ItemService) => {

        service.add(ItemMock).subscribe();

        const rq = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
        rq.flush({});

        expect(rq.request.method).toEqual('POST');
        expect(rq.request.body).toEqual(ItemMock);

        httpMock.verify();
      })
    );

  });

  describe('getAll', function () {

    it('should perform a GET request to get all items',
      inject([HttpTestingController, ItemService], (httpMock: HttpTestingController, service: ItemService) => {

        service.getAll().subscribe(response => {
          expect(response).toEqual([ItemMock]);
        });

        const rq = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
        rq.flush([ItemMock]);

        expect(rq.request.method).toEqual('GET');

        httpMock.verify();
      })
    );

  });

  describe('getById', function () {

    it('should perform a GET request to retrieve an item by item id',
      inject([HttpTestingController, ItemService], (httpMock: HttpTestingController, service: ItemService) => {

        service.getById(1).subscribe(response => {
          expect(response).toEqual(ItemMock);
        });

        const rq = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
        rq.flush(ItemMock);

        expect(rq.request.method).toEqual('GET');

        httpMock.verify();
      })
    );

  });

  describe('update', function () {

    it('should perform a PUT request to update an existing item',
      inject([HttpTestingController, ItemService], (httpMock: HttpTestingController, service: ItemService) => {

        service.update(ItemMock).subscribe();

        const rq = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/${ItemMock.id}`);
        rq.flush({});

        expect(rq.request.method).toEqual('PUT');
        expect(rq.request.body).toEqual(ItemMock);

        httpMock.verify();
      })
    );

  });

  describe('remove', function () {

    it('should perform a DELETE request to delete an item by item id',
      inject([HttpTestingController, ItemService], (httpMock: HttpTestingController, service: ItemService) => {

        service.remove(1).subscribe();

        const rq = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts/1');
        rq.flush(ItemMock);

        expect(rq.request.method).toEqual('DELETE');

        httpMock.verify();
      })
    );

  });

  describe('getUserItems', function () {

    it('should throw an error message if user is not logged in',
      inject([HttpTestingController, ItemService], (httpMock: HttpTestingController, service: ItemService) => {

        loggedInFlag = false;

        expect(() => service.getUserItems()).toThrow('AUTH.ERROR.REQUIRED');

        httpMock.expectNone('https://jsonplaceholder.typicode.com/posts');
        httpMock.verify();
      })
    );

    it('should not throw an error message if user is logged in',
      inject([HttpTestingController, ItemService], (service: ItemService) => {

        loggedInFlag = true;

        expect(() => service.getUserItems()).not.toThrow('AUTH.ERROR.REQUIRED');
      })
    );

    it('should perform a GET request to retrieve items by user id',
      inject([HttpTestingController, ItemService], (httpMock: HttpTestingController, service: ItemService) => {

        loggedInFlag = true;

        service.getUserItems().subscribe(response => {
          expect(response).toEqual([ItemMock]);
        });

        const rq = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts?userId=1');
        rq.flush([ItemMock]);


        httpMock.verify();
      })
    );

  });

});

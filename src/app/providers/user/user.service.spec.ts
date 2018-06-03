import { TestBed, inject } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../../models/user.model';

const UserMock = {
  id: 5,
  name: 'Chelsey Dietrich',
  username: 'Kamren',
  email: 'Lucio_Hettinger@annie.ca',
  address: {
    street: 'Skiles Walks',
    suite: 'Suite 351',
    city: 'Roscoeview',
    zipcode: '33263',
    geo: {
      lat: '-31.8129',
      lng: '62.5342'
    }
  },
  phone: '(254)954-1289',
  website: 'demarco.info',
  company: {
    name: 'Keebler LLC',
    catchPhrase: 'User-centric fault-tolerant solution',
    bs: 'revolutionize end-to-end systems'
  }
} as User;


describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe('getById', function () {

    it('should perform a GET request to retrieve user data by user id',
      inject([HttpTestingController, UserService], (httpMock: HttpTestingController, service: UserService) => {

        service.getById(UserMock.id).subscribe(response => {
          expect(response).toEqual(UserMock);
        });

        const rq = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users/${UserMock.id}`);
        rq.flush(UserMock);

        expect(rq.request.method).toEqual('GET');

        httpMock.verify();
      }));
  });

  describe('getAll', function () {

    it('should perform a GET request to retrieve a paginated users list with default page number and results per page',
      inject([HttpTestingController, UserService], (httpMock: HttpTestingController, service: UserService) => {

        service.getAll().subscribe(response => {
          expect(response).toEqual([UserMock]);
        });

        const rq = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users/?_page=1&_limit=10`);
        rq.flush([UserMock]);

        expect(rq.request.method).toEqual('GET');

        httpMock.verify();
      }));

    it('should perform a GET request to retrieve a paginated users list with provided page number and results per page arguments',
      inject([HttpTestingController, UserService], (httpMock: HttpTestingController, service: UserService) => {

        service.getAll(2, 5).subscribe(response => {
          expect(response).toEqual([UserMock]);
        });

        const rq = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users/?_page=2&_limit=5`);
        rq.flush([UserMock]);

        expect(rq.request.method).toEqual('GET');

        httpMock.verify();
      }));

    it('should perform a GET request to retrieve a paginated users list with provided invalid values for page number and results per page arguments',
      inject([HttpTestingController, UserService], (httpMock: HttpTestingController, service: UserService) => {

        service.getAll(undefined, -5).subscribe(response => {
          expect(response).toEqual([UserMock]);
        });

        const rq = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users/?_page=1&_limit=10`);
        rq.flush([UserMock]);

        expect(rq.request.method).toEqual('GET');

        httpMock.verify();
      }));
  });

  describe('login', function () {

    it('should perform a POST request to authenticate a user',
      inject([HttpTestingController, UserService], (httpMock: HttpTestingController, service: UserService) => {

        service.login('john', 'qwerty').subscribe(response => {
          expect(response).toEqual(UserMock);
        });

        const rq = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users`);
        rq.flush(UserMock);

        expect(rq.request.method).toEqual('POST');
        expect(rq.request.body).toEqual({
          username: 'john',
          password: 'qwerty'
        });

        httpMock.verify();

      }));


    it('should set user private property to the response received,  if the login is successful',
      inject([HttpTestingController, UserService], (httpMock: HttpTestingController, service: UserService) => {

        service.login('john', 'qwerty').subscribe(response => {
          expect(response).toEqual(UserMock);
        });

        const rq = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users`);
        rq.flush(UserMock);

        expect(service.isLoggedIn()).toBeTruthy();
        expect(service.getUser()).toEqual(UserMock);
      }));


    it('should set the user private property to empty User model, if the login is not successful',
      inject([HttpTestingController, UserService], (httpMock: HttpTestingController, service: UserService) => {

        service.login('john', 'qwerty').subscribe(response => {
          expect(response instanceof HttpErrorResponse).toBeTruthy();
        });

        const rq = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users`);
        rq.flush('', {
          status: 404,
          statusText: 'user not found'
        });

        expect(service.isLoggedIn()).toBeFalsy();
        expect(service.getUser()).toEqual(new User);
      }));

  });

});

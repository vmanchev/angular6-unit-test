import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JokesService } from './jokes.service';

describe('JokesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JokesService]
    });
  });

  it('should be created', inject([HttpTestingController, JokesService], (httpMock: HttpTestingController, service: JokesService) => {

    service.getRandomJoke().subscribe(joke => {
      expect(joke).toEqual({ value: 'this is a joke' });
    });

    const rq = httpMock.expectOne('https://api.chucknorris.io/jokes/random');
    rq.flush({ value: 'this is a joke' });

    expect(rq.request.method).toEqual('GET');

    httpMock.verify();

  }));
});

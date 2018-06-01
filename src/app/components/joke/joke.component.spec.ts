import {
  async,
  TestBed,
  fakeAsync,
  tick,
  flush,
  ComponentFixture
} from '@angular/core/testing';

import { JokeComponent } from './joke.component';
import { JokesService } from '../../providers/jokes/jokes.service';
import { Observable, of } from 'rxjs';

class MockJokeService {
  public joke: any = { value: 'this is a test joke' };

  getRandomJoke() {
    return of(this.joke)
  }
}


describe('JokeComponent', () => {

  let fixture: ComponentFixture<JokeComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        JokeComponent
      ],
      providers: [
        { provide: JokesService, useClass: MockJokeService }
      ]
    });

    fixture = TestBed.createComponent(JokeComponent);
    fixture.detectChanges();

  });

  it('should get a random joke, using fakeAsync', fakeAsync(() => {

    fixture.componentInstance.getJoke();

    // use tick() if we want to call detectChanges() several times
    // tick();

    // use flush if only one call to detectChanges is required
    flush();
    fixture.detectChanges();

    // test only the change in public joke property
    expect(fixture.componentInstance.joke).toEqual({ value: 'this is a test joke' });

    // test the change in the underlying html
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').innerText).toEqual('this is a test joke');
  }));

  it('should get a random joke, using async', async(() => {

    fixture.componentInstance.getJoke();

    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();

        // test only the change in public joke property
        expect(fixture.componentInstance.joke).toEqual({ value: 'this is a test joke' });

        // test the change in the underlying html
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').innerText).toEqual('this is a test joke');
      });

  }));
});

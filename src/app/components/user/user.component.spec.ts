import { async, fakeAsync, flush, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserComponent } from './user.component';
import { FormatAddressPipe } from '../../pipes/format-address/format-address.pipe';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user.service';

const UserMock = {
  id: 101,
  name: 'John Doe',
  address: {
    street: 'test street'
  }
} as User;

class UserServiceMock {

  getById() {
    return of(UserMock)
  }

  getAll(): Observable<User[]> {
    return of([UserMock]);
  }
}

describe('UserComponent', () => {

  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        UserComponent,
        FormatAddressPipe
      ],
      providers: [
        { provide: UserService, useClass: UserServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getData', () => {

    beforeEach(() => {
      spyOn(component, 'getUserById').and.callThrough();
      spyOn(component, 'getAllUsers').and.callThrough();
    });

    it('should get a single user data, if id is provided in params', () => {

      component.getData({ id: 1 });

      expect(component.getUserById).toHaveBeenCalledWith(1);
      expect(component.getAllUsers).not.toHaveBeenCalled();
    });

    it('should get all users, if id is not provided in params', () => {

      component.getData({});

      expect(component.getAllUsers).toHaveBeenCalled();
      expect(component.getUserById).not.toHaveBeenCalled();
    });

  });

  describe('getAllUsers', () => {

    beforeEach(() => {
      spyOn(component.userService, 'getAll').and.callThrough();
      component.getAllUsers();
    });

    it('should use userService.getAllUsers method to retrieve a users list', fakeAsync(() => {
      flush();
      fixture.detectChanges();
      expect(component.userService.getAll).toHaveBeenCalled();
    }));

    it('should set users list to response data', fakeAsync(() => {
      flush();
      fixture.detectChanges();
      expect(component.users).toEqual([UserMock]);
    }));
  });

  describe('getUserById', () => {

    beforeEach(() => {
      spyOn(component.userService, 'getById').and.callThrough();
      component.getUserById(1);
    });

    it('should use userService.getById method to retrieve user data by id', fakeAsync(() => {
      flush();
      fixture.detectChanges();

      expect(component.userService.getById).toHaveBeenCalledWith(1);
    }));

    it('should use userService.getById method to retrieve user data by id', fakeAsync(() => {
      flush();
      fixture.detectChanges();

      expect(component.user).toEqual(UserMock);
    }));
  });
});

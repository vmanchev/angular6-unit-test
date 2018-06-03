import { async, fakeAsync, flush, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemComponent } from './item.component';
import { ItemService } from '../../providers/item/item.service';
import { Item } from '../../models/item.model';
import { Observable, of } from 'rxjs';

const ItemMock = {
  id: 1,
  userId: 1,
  title: 'test title',
  body: 'test body'
} as Item;

class ItemServiceMock {

  getAll(): Observable<Item[]> {
    return of([ItemMock])
  }

}

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ItemComponent],
      providers: [
        { provide: ItemService, useClass: ItemServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should perform a GET request to retrieve all items', fakeAsync(() => {

      flush();
      fixture.detectChanges();

      expect(fixture.componentInstance.items).toEqual([ItemMock]);

    }));
  });

});

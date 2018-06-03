import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleComponent } from './simple.component';
import { ToUpperPipe } from '../../pipes/to-upper/to-upper.pipe';

describe('SimpleComponent', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SimpleComponent,
        ToUpperPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have welcomeText defined', () => {
      expect(component.getWelcomeText()).toEqual('This is a simple component');
    });

  });

  describe('changeText', function () {

    it('should change the welcome text to a new value', () => {
      component.changeText('test4');
      expect(component.getWelcomeText()).toEqual('test4');
    });

  });
});

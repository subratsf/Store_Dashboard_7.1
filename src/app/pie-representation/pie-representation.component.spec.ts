import { TestBed, async } from '@angular/core/testing';
import { PieRepresentationComponent } from './pie-representation.component';

describe('GroupedBarRepresentationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PieRepresentationComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PieRepresentationComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'store-dashboard'`, () => {
    const fixture = TestBed.createComponent(PieRepresentationComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('store-dashboard');
  });

});

import { TestBed, async } from '@angular/core/testing';
import { GroupedBarRepresentationComponent } from './grouped-bar-representation.component';

describe('GroupedBarRepresentationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroupedBarRepresentationComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GroupedBarRepresentationComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'store-dashboard'`, () => {
    const fixture = TestBed.createComponent(GroupedBarRepresentationComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('store-dashboard');
  });
});

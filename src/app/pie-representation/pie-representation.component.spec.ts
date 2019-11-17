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

  it(`should have as title 'angularmat'`, () => {
    const fixture = TestBed.createComponent(PieRepresentationComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angularmat');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(PieRepresentationComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angularmat!');
  });
});

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { App } from './app';

const mockBreakpointObserver = {
  observe: () => of({ matches: false, breakpoints: {} }),
};

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render the navbar', () => {
    const navbar = fixture.nativeElement.querySelector('app-navbar');
    expect(navbar).not.toBeNull();
  });

  it('should render router-outlet', () => {
    const outlet = fixture.nativeElement.querySelector('router-outlet');
    expect(outlet).not.toBeNull();
  });

  it('should render the footer', () => {
    const footer = fixture.nativeElement.querySelector('app-footer');
    expect(footer).not.toBeNull();
  });
});

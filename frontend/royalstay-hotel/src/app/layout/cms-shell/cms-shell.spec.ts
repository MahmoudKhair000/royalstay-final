import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CmsShell } from './cms-shell';

describe('CmsShell', () => {
  let fixture: ComponentFixture<CmsShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsShell],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CmsShell);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

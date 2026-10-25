import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hotel } from './hotel';

describe('Hotel', () => {
  let component: Hotel;
  let fixture: ComponentFixture<Hotel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hotel],
    }).compileComponents();

    fixture = TestBed.createComponent(Hotel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

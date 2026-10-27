import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelForm } from './hotel-form';

describe('HotelForm', () => {
  let fixture: ComponentFixture<HotelForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelForm],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelForm);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

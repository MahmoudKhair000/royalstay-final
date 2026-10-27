import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationList } from './reservation-list';

describe('ReservationList', () => {
  let fixture: ComponentFixture<ReservationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationList],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationList);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

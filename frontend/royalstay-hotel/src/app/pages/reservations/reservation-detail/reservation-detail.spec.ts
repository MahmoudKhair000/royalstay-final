import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ReservationDetail } from './reservation-detail';

describe('ReservationDetail', () => {
  let fixture: ComponentFixture<ReservationDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationDetail],
      providers: [{ provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'test-id' } } } }],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationDetail);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

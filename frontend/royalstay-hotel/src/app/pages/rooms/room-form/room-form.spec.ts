import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomForm } from './room-form';

describe('RoomForm', () => {
  let fixture: ComponentFixture<RoomForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomForm);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResQueryComponent } from './res-query.component';

describe('ResQueryComponent', () => {
  let component: ResQueryComponent;
  let fixture: ComponentFixture<ResQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResQueryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

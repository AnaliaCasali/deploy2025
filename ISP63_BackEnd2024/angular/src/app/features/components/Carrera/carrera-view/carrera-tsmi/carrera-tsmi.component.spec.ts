import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraTsmiComponent } from './carrera-tsmi.component';

describe('CarreraTsmiComponent', () => {
  let component: CarreraTsmiComponent;
  let fixture: ComponentFixture<CarreraTsmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarreraTsmiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarreraTsmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

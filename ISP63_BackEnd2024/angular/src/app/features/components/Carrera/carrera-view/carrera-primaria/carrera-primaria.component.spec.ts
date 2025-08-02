import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraPrimariaComponent } from './carrera-primaria.component';

describe('CarreraPrimariaComponent', () => {
  let component: CarreraPrimariaComponent;
  let fixture: ComponentFixture<CarreraPrimariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarreraPrimariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarreraPrimariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraBiologiaComponent } from './carrera-biologia.component';

describe('CarreraBiologiaComponent', () => {
  let component: CarreraBiologiaComponent;
  let fixture: ComponentFixture<CarreraBiologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarreraBiologiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarreraBiologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

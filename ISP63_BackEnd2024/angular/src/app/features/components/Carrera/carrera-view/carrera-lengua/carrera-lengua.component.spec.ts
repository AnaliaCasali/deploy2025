import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraLenguaComponent } from './carrera-lengua.component';

describe('CarreraLenguaComponent', () => {
  let component: CarreraLenguaComponent;
  let fixture: ComponentFixture<CarreraLenguaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarreraLenguaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarreraLenguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

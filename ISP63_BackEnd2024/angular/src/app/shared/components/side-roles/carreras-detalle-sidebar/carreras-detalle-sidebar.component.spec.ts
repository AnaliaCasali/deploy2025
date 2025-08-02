import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasDetalleSidebarComponent } from './carreras-detalle-sidebar.component';

describe('CarrerasDetalleSidebarComponent', () => {
  let component: CarrerasDetalleSidebarComponent;
  let fixture: ComponentFixture<CarrerasDetalleSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrerasDetalleSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrerasDetalleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

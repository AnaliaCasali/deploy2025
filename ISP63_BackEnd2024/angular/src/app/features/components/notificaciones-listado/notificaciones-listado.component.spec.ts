import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesListadoComponent } from './notificaciones-listado.component';

describe('NotificacionesListadoComponent', () => {
  let component: NotificacionesListadoComponent;
  let fixture: ComponentFixture<NotificacionesListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionesListadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionesListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

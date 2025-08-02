import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEgresadoComponent } from './formulario-egresado.component';

describe('FormularioEgresadoComponent', () => {
  let component: FormularioEgresadoComponent;
  let fixture: ComponentFixture<FormularioEgresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEgresadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoLoginComponent } from './encabezado-login.component';

describe('EncabezadoLoginComponent', () => {
  let component: EncabezadoLoginComponent;
  let fixture: ComponentFixture<EncabezadoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncabezadoLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncabezadoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

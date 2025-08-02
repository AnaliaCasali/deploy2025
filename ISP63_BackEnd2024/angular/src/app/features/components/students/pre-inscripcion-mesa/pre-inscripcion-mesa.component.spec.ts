import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInscripcionMesaComponent } from './pre-inscripcion-mesa.component';

describe('PreInscripcionMesaComponent', () => {
  let component: PreInscripcionMesaComponent;
  let fixture: ComponentFixture<PreInscripcionMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreInscripcionMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreInscripcionMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

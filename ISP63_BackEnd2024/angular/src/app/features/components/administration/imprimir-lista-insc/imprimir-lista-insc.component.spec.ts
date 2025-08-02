import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirListaInscComponent } from './imprimir-lista-insc.component';

describe('ImprimirListaInscComponent', () => {
  let component: ImprimirListaInscComponent;
  let fixture: ComponentFixture<ImprimirListaInscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprimirListaInscComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimirListaInscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

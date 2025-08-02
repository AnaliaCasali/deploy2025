import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirActaMesaComponent } from './imprimir-acta-mesa.component';

describe('ImprimirActaMesaComponent', () => {
  let component: ImprimirActaMesaComponent;
  let fixture: ComponentFixture<ImprimirActaMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprimirActaMesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimirActaMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptosAprovadosComponent } from './inscriptos-aprovados.component';

describe('InscriptosAprovadosComponent', () => {
  let component: InscriptosAprovadosComponent;
  let fixture: ComponentFixture<InscriptosAprovadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptosAprovadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptosAprovadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

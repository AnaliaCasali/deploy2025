import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelatividadTecnicaturaComponent } from './correlatividad-tecnicatura.component';

describe('CorrelatividadTecnicaturaComponent', () => {
  let component: CorrelatividadTecnicaturaComponent;
  let fixture: ComponentFixture<CorrelatividadTecnicaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrelatividadTecnicaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrelatividadTecnicaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

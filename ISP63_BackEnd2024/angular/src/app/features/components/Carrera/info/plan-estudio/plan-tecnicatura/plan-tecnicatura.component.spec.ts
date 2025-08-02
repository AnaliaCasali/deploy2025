import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTecnicaturaComponent } from './plan-tecnicatura.component';

describe('PlanTecnicaturaComponent', () => {
  let component: PlanTecnicaturaComponent;
  let fixture: ComponentFixture<PlanTecnicaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanTecnicaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanTecnicaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

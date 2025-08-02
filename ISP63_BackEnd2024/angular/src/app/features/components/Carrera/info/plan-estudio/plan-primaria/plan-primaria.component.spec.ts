import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPrimariaComponent } from './plan-primaria.component';

describe('PlanPrimariaComponent', () => {
  let component: PlanPrimariaComponent;
  let fixture: ComponentFixture<PlanPrimariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanPrimariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanPrimariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

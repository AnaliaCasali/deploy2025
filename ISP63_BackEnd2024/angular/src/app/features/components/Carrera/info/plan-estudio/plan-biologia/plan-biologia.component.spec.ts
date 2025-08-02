import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanBiologiaComponent } from './plan-biologia.component';

describe('PlanBiologiaComponent', () => {
  let component: PlanBiologiaComponent;
  let fixture: ComponentFixture<PlanBiologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanBiologiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanBiologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

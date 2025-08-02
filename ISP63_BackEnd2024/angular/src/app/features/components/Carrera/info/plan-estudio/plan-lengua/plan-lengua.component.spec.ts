import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanLenguaComponent } from './plan-lengua.component';

describe('PlanLenguaComponent', () => {
  let component: PlanLenguaComponent;
  let fixture: ComponentFixture<PlanLenguaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanLenguaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanLenguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanTsmiComponent } from './plan-tsmi.component';

describe('PlanTsmiComponent', () => {
  let component: PlanTsmiComponent;
  let fixture: ComponentFixture<PlanTsmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanTsmiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanTsmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

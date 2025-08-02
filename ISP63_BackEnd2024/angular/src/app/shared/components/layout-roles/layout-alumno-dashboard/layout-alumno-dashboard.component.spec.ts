import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAlumnoDashboardComponent } from './layout-alumno-dashboard.component';

describe('LayoutAlumnoDashboardComponent', () => {
  let component: LayoutAlumnoDashboardComponent;
  let fixture: ComponentFixture<LayoutAlumnoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutAlumnoDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAlumnoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

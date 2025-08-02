import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDocenteDashboardComponent } from './layout-docente-dashboard.component';

describe('LayoutDocenteDashboardComponent', () => {
  let component: LayoutDocenteDashboardComponent;
  let fixture: ComponentFixture<LayoutDocenteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutDocenteDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutDocenteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAdminDashboardComponent } from './layout-admin-dashboard.component';

describe('LayoutAdminDashboardComponent', () => {
  let component: LayoutAdminDashboardComponent;
  let fixture: ComponentFixture<LayoutAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutAdminDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

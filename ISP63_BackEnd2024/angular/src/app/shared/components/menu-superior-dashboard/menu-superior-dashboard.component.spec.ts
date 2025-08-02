import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSuperiorDashboardComponent } from './menu-superior-dashboard.component';

describe('MenuSuperiorDashboardComponent', () => {
  let component: MenuSuperiorDashboardComponent;
  let fixture: ComponentFixture<MenuSuperiorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSuperiorDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSuperiorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

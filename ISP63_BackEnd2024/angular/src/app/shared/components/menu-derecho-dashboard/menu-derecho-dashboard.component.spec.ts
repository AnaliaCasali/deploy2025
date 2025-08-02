import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDerechoDashboardComponent } from './menu-derecho-dashboard.component';

describe('MenuDerechoDashboardComponent', () => {
  let component: MenuDerechoDashboardComponent;
  let fixture: ComponentFixture<MenuDerechoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDerechoDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDerechoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

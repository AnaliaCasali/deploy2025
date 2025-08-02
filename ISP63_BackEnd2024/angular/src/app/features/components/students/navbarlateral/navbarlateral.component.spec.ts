import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarlateralComponent } from './navbarlateral.component';

describe('NavbarlateralComponent', () => {
  let component: NavbarlateralComponent;
  let fixture: ComponentFixture<NavbarlateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarlateralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarlateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

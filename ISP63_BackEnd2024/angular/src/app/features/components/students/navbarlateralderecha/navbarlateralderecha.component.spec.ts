import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarlateralderechaComponent } from './navbarlateralderecha.component';

describe('NavbarlateralderechaComponent', () => {
  let component: NavbarlateralderechaComponent;
  let fixture: ComponentFixture<NavbarlateralderechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarlateralderechaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarlateralderechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

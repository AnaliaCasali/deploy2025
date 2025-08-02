import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetallesComponent } from './user-detalles.component';

describe('UserDetallesComponent', () => {
  let component: UserDetallesComponent;
  let fixture: ComponentFixture<UserDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupacionComponent } from './ocupacion.component';

describe('OcupacionComponent', () => {
  let component: OcupacionComponent;
  let fixture: ComponentFixture<OcupacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcupacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcupacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

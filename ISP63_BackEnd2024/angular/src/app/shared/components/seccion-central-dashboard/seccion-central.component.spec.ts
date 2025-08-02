import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionCentralComponent } from './seccion-central.component';

describe('SeccionCentralComponent', () => {
  let component: SeccionCentralComponent;
  let fixture: ComponentFixture<SeccionCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionCentralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

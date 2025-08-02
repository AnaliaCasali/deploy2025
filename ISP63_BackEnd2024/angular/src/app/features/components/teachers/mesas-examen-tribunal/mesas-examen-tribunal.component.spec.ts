import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasExamenTribunalComponent } from './mesas-examen-tribunal.component';

describe('MesasExamenTribunalComponent', () => {
  let component: MesasExamenTribunalComponent;
  let fixture: ComponentFixture<MesasExamenTribunalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesasExamenTribunalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesasExamenTribunalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

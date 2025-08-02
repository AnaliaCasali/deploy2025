import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasExamenComponent } from './mesas-examen.component';

describe('MesasExamenComponent', () => {
  let component: MesasExamenComponent;
  let fixture: ComponentFixture<MesasExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesasExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesasExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

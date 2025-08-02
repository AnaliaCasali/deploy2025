import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisMesasExamenComponent } from './mis-mesas-examen.component';

describe('MisMesasExamenComponent', () => {
  let component: MisMesasExamenComponent;
  let fixture: ComponentFixture<MisMesasExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisMesasExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisMesasExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

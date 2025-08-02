import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripCarreraComponent } from './inscrip-carrera.component';

describe('InscripCarreraComponent', () => {
  let component: InscripCarreraComponent;
  let fixture: ComponentFixture<InscripCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripCarreraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

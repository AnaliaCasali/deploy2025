import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasMesaExamenComponent } from './notas-mesa-examen.component';

describe('NotasMesaExamenComponent', () => {
  let component: NotasMesaExamenComponent;
  let fixture: ComponentFixture<NotasMesaExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotasMesaExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotasMesaExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

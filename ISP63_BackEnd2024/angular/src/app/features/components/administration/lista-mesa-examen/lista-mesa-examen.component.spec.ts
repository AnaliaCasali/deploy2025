import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMesaExamenComponent } from './lista-mesa-examen.component';

describe('ListaMesaExamenComponent', () => {
  let component: ListaMesaExamenComponent;
  let fixture: ComponentFixture<ListaMesaExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMesaExamenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaMesaExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearEventoComponent } from '../eventos/crear-evento/crear-evento.component';

 
describe('CrearEventoComponent', () => {
  let component: CrearEventoComponent;
  let fixture: ComponentFixture<CrearEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
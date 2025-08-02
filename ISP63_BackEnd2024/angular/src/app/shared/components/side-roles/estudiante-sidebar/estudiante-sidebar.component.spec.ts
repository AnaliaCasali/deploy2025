import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteSidebarComponent } from './estudiante-sidebar.component';

describe('EstudianteSidebarComponent', () => {
  let component: EstudianteSidebarComponent;
  let fixture: ComponentFixture<EstudianteSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudianteSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

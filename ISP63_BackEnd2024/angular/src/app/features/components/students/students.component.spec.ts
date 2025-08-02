import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsComponent } from './students.component';
import { RouterLink, RouterOutlet } from '@angular/router';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsComponent, RouterOutlet,RouterLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteSidebarComponent } from './docente-sidebar.component';

describe('DocenteSidebarComponent', () => {
  let component: DocenteSidebarComponent;
  let fixture: ComponentFixture<DocenteSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocenteSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

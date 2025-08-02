import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosViewComponent } from './eventos-view.component';

describe('EventosViewComponent', () => {
  let component: EventosViewComponent;
  let fixture: ComponentFixture<EventosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

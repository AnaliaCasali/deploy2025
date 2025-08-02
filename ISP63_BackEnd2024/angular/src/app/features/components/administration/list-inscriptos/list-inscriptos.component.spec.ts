import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInscriptosComponent } from './list-inscriptos.component';

describe('ListInscriptosComponent', () => {
  let component: ListInscriptosComponent;
  let fixture: ComponentFixture<ListInscriptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInscriptosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListInscriptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

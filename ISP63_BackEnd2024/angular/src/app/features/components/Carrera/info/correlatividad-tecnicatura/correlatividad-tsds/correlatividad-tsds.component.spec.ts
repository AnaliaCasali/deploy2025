import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelatividadTsdsComponent } from './correlatividad-tsds.component';

describe('CorrelatividadTsdsComponent', () => {
  let component: CorrelatividadTsdsComponent;
  let fixture: ComponentFixture<CorrelatividadTsdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrelatividadTsdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrelatividadTsdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

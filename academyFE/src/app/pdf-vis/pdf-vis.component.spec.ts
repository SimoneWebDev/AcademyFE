import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfVisComponent } from './pdf-vis.component';

describe('PdfVisComponent', () => {
  let component: PdfVisComponent;
  let fixture: ComponentFixture<PdfVisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfVisComponent]
    });
    fixture = TestBed.createComponent(PdfVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

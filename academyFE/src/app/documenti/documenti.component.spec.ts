import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentiComponent } from './documenti.component';

describe('DocumentiComponent', () => {
  let component: DocumentiComponent;
  let fixture: ComponentFixture<DocumentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentiComponent]
    });
    fixture = TestBed.createComponent(DocumentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

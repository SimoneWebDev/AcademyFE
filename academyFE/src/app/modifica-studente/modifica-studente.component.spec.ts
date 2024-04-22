import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaStudenteComponent } from './modifica-studente.component';

describe('ModificaStudenteComponent', () => {
  let component: ModificaStudenteComponent;
  let fixture: ComponentFixture<ModificaStudenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificaStudenteComponent]
    });
    fixture = TestBed.createComponent(ModificaStudenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

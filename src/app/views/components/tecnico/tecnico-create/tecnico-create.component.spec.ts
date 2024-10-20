import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoCreateComponent } from './tecnico-create.component';

describe('TecnicoCreateComponent', () => {
  let component: TecnicoCreateComponent;
  let fixture: ComponentFixture<TecnicoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TecnicoCreateComponent]
    });
    fixture = TestBed.createComponent(TecnicoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

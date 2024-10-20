import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoDeleteComponent } from './tecnico-delete.component';

describe('TecnicoDeleteComponent', () => {
  let component: TecnicoDeleteComponent;
  let fixture: ComponentFixture<TecnicoDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TecnicoDeleteComponent]
    });
    fixture = TestBed.createComponent(TecnicoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

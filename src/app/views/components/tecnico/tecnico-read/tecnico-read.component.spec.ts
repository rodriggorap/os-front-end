import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoReadComponent } from './tecnico-read.component';

describe('TecnicoReadComponent', () => {
  let component: TecnicoReadComponent;
  let fixture: ComponentFixture<TecnicoReadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TecnicoReadComponent]
    });
    fixture = TestBed.createComponent(TecnicoReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

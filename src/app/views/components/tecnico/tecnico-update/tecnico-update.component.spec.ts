import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoUpdateComponent } from './tecnico-update.component';

describe('TecnicoUpdateComponent', () => {
  let component: TecnicoUpdateComponent;
  let fixture: ComponentFixture<TecnicoUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TecnicoUpdateComponent]
    });
    fixture = TestBed.createComponent(TecnicoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

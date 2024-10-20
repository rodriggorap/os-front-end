import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsUpdateComponent } from './os-update.component';

describe('OsUpdateComponent', () => {
  let component: OsUpdateComponent;
  let fixture: ComponentFixture<OsUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OsUpdateComponent]
    });
    fixture = TestBed.createComponent(OsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

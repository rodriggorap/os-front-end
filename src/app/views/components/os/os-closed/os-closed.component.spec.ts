import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsClosedComponent } from './os-closed.component';

describe('OsClosedComponent', () => {
  let component: OsClosedComponent;
  let fixture: ComponentFixture<OsClosedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OsClosedComponent]
    });
    fixture = TestBed.createComponent(OsClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

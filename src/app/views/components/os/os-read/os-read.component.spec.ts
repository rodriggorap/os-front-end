import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsReadComponent } from './os-read.component';

describe('OsReadComponent', () => {
  let component: OsReadComponent;
  let fixture: ComponentFixture<OsReadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OsReadComponent]
    });
    fixture = TestBed.createComponent(OsReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

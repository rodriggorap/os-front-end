import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDeleteComponent } from './cliente-delete.component';

describe('ClienteDeleteComponent', () => {
  let component: ClienteDeleteComponent;
  let fixture: ComponentFixture<ClienteDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteDeleteComponent]
    });
    fixture = TestBed.createComponent(ClienteDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

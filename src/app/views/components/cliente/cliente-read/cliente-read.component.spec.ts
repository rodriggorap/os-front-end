import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteReadComponent } from './cliente-read.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteService } from 'src/app/services/cliente.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

fdescribe('ClienteReadComponent', () => {
  let component: ClienteReadComponent;
  let fixture: ComponentFixture<ClienteReadComponent>;
  let service: ClienteService;
  let router: Router;

  const cliente = [
    {
    "id": 9,
    "nome": "Rodrigo Amaro",
    "cpf": "598.508.200-80",
    "telefone": "(88) 98888-7777"
  },
  {
    "id": 9,
    "nome": "Marcos Amaro",
    "cpf": "598.508.200-80",
    "telefone": "(88) 98888-7777"
  }
]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, 
        MatPaginatorModule, 
        MatTableModule, 
        MatSnackBarModule,
        BrowserAnimationsModule],
      declarations: [ClienteReadComponent]
    });
    fixture = TestBed.createComponent(ClienteReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ClienteService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve consultar clientes', () => {
    spyOn(service, 'findAll').and.returnValue(of(cliente));
    component.findAll();
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(component.clientes).toEqual(cliente);
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.data).toEqual(cliente);
    expect(component.dataSource.paginator).toBe(component.paginator);
  });

  it('Deve navegar para o componente cliente-create', () => {
    spyOn(router, 'navigate')
    component.navigateToCreate();
    expect(router.navigate).toHaveBeenCalledWith(['clientes/create']);
  });

});

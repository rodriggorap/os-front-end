import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsReadComponent } from './os-read.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { of } from 'rxjs';
import { OS } from 'src/app/models/OS';
import { Router } from '@angular/router';

fdescribe('OsReadComponent', () => {
  let component: OsReadComponent;
  let fixture: ComponentFixture<OsReadComponent>;
  let service: OsService;
  let tecnicoService: TecnicoService;
  let clienteService: ClienteService;
  let router: Router;

  const tecnico = {
    "id": 9,
    "nome": "Rodrigo Amaro",
    "cpf": "598.508.200-80",
    "telefone": "(88) 98888-7777"
  }

  const cliente = {
    "id": 9,
    "nome": "Marcos Amaro",
    "cpf": "598.508.200-80",
    "telefone": "(88) 98888-7777"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatTableModule,
        BrowserAnimationsModule
      ],
      declarations: [OsReadComponent]
    });
    fixture = TestBed.createComponent(OsReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(OsService);
    tecnicoService = TestBed.inject(TecnicoService);
    clienteService = TestBed.inject(ClienteService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve filtrar itens com status diferente de "ENCERRADO" e configurar dataSource e paginator', () => {
    const mockResponse = [
      {
        "id": 1,
        "dataAbertura": "07/11/2024 22:46",
        "dataFechamento": "07/11/2024 22:46", 
        "prioridade": "ALTA",
        "obvervacoes": "Teste create OD",
        "status": "ABERTA",
        "tecnico": 1,
        "cliente": 9
      },
      {
        "id": 1,
        "dataAbertura": "07/11/2024 22:46",
        "dataFechamento": "07/11/2024 22:46",
        "prioridade": "ALTA",
        "obvervacoes": "Teste create OD",
        "status": "ABERTA",
        "tecnico": 1,
        "cliente": 9
      },
      {
        "id": 1,
        "dataAbertura": "07/11/2024 22:46",
        "dataFechamento": "07/11/2024 22:46",
        "prioridade": "ALTA",
        "obvervacoes": "Teste create OD",
        "status": "ENCERRADO",
        "tecnico": 1,
        "cliente": 9
      }
    ] as OS[];

    const os = [
      {
        "id": 1,
        "dataAbertura": "07/11/2024 22:46",
        "dataFechamento": "07/11/2024 22:46",
        "prioridade": "ALTA",
        "obvervacoes": "Teste create OD",
        "status": "ABERTA",
        "tecnico": "Rodrigo Amaro",
        "cliente": "Marcos Amaro"
      },
      {
        "id": 1,
        "dataAbertura": "07/11/2024 22:46",
        "dataFechamento": "07/11/2024 22:46",
        "prioridade": "ALTA",
        "obvervacoes": "Teste create OD",
        "status": "ABERTA",
        "tecnico": "Rodrigo Amaro",
        "cliente": "Marcos Amaro"
      }
    ]

    spyOn(service, 'findAll').and.returnValue(of(mockResponse));
    spyOn(tecnicoService, 'findById').and.returnValue(of(tecnico));
    spyOn(clienteService, 'findById').and.returnValue(of(cliente));
    component.findAll();

    expect(service.findAll).toHaveBeenCalledWith();
    expect(component.os.length).toBe(2);
    expect(component.os).toEqual(os);
    expect(component.dataSource.data).toEqual(os);
    expect(component.dataSource.paginator).toBe(component.paginator);
  });

  it('Deve navegar para o componente os/create', () => {
    spyOn(router, 'navigate');
    component.navigateToCreate();

    expect(router.navigate).toHaveBeenCalledWith(['os/create']);
  });

  it('Deve listar Técnico', () => {
    component.os = [
      {
        "id": 1,
        "dataAbertura": "07/11/2024 22:46",
        "dataFechamento": "07/11/2024 22:46",
        "prioridade": "ALTA",
        "obvervacoes": "Teste create OD",
        "status": "ENCERRADO",
        "tecnico": 1,
        "cliente": 9
      },
      {
        "id": 1,
        "dataAbertura": "07/11/2024 22:46",
        "dataFechamento": "07/11/2024 22:46",
        "prioridade": "ALTA",
        "obvervacoes": "Teste create OD",
        "status": "ENCERRADO",
        "tecnico": 1,
        "cliente": 9
      }]
    
      const os = [
        {
          "id": 1,
          "dataAbertura": "07/11/2024 22:46",
          "dataFechamento": "07/11/2024 22:46",
          "prioridade": "ALTA",
          "obvervacoes": "Teste create OD",
          "status": "ENCERRADO",
          "tecnico": "Rodrigo Amaro",
          "cliente": 9
        },
        {
          "id": 1,
          "dataAbertura": "07/11/2024 22:46",
          "dataFechamento": "07/11/2024 22:46",
          "prioridade": "ALTA",
          "obvervacoes": "Teste create OD",
          "status": "ENCERRADO",
          "tecnico": "Rodrigo Amaro",
          "cliente": 9
        }
      ]

    spyOn(tecnicoService, 'findById').and.returnValue(of(tecnico));
    component.listarTecnico();

    expect(tecnicoService.findById).toHaveBeenCalledTimes(2);
    expect(component.os.length).toBe(2);
    expect(component.os).toEqual(os);
  });

  it('Deve listar Cliente', () => {
    component.os = [
      {
        "id": 1,
        "dataAbertura": "07/11/2024 22:46",
        "dataFechamento": "07/11/2024 22:46",
        "prioridade": "ALTA",
        "obvervacoes": "Teste create OD",
        "status": "ENCERRADO",
        "tecnico": 1,
        "cliente": 9
      },
      {
        "id": 1,
        "dataAbertura": "07/11/2024 22:46",
        "dataFechamento": "07/11/2024 22:46",
        "prioridade": "ALTA",
        "obvervacoes": "Teste create OD",
        "status": "ENCERRADO",
        "tecnico": 1,
        "cliente": 9
      }]
    
      const os = [
        {
          "id": 1,
          "dataAbertura": "07/11/2024 22:46",
          "dataFechamento": "07/11/2024 22:46",
          "prioridade": "ALTA",
          "obvervacoes": "Teste create OD",
          "status": "ENCERRADO",
          "tecnico": 1,
          "cliente": "Marcos Amaro"
        },
        {
          "id": 1,
          "dataAbertura": "07/11/2024 22:46",
          "dataFechamento": "07/11/2024 22:46",
          "prioridade": "ALTA",
          "obvervacoes": "Teste create OD",
          "status": "ENCERRADO",
          "tecnico": 1,
          "cliente": "Marcos Amaro"
        }
      ]

    spyOn(clienteService, 'findById').and.returnValue(of(cliente));
    component.listarCliente();

    expect(clienteService.findById).toHaveBeenCalledTimes(2);
    expect(component.os.length).toBe(2);
    expect(component.os).toEqual(os);
  });

  it('Deve retornar prioridade "BAIXA"', () => {
    expect(component.prioridade("BAIXA")).toBe('baixa');
  })

  it ('Deve retornar prioridade "MEDIA"', () => {
    const result = component.prioridade("MEDIA");

    expect(result).toBe('media');
  });

  it('Deve retornar prioridade "ALTA"', () => {
    const result = component.prioridade("NDA");

    expect(result).toBe('alta');
  });
});


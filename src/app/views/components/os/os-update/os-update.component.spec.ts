import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsUpdateComponent } from './os-update.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OsService } from 'src/app/services/os.service';
import { of } from 'rxjs';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ClienteService } from 'src/app/services/cliente.service';

fdescribe('OsUpdateComponent', () => {
  let component: OsUpdateComponent;
  let fixture: ComponentFixture<OsUpdateComponent>;
  let service: OsService;
  let router: Router;
  let tecnicoService: TecnicoService;
  let clienteService: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get(): string {
                return '123';
              },
            },
          },
        },
      }],
      declarations: [OsUpdateComponent]
    });
    fixture = TestBed.createComponent(OsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(OsService);
    router = TestBed.inject(Router);
    tecnicoService = TestBed.inject(TecnicoService);
    clienteService = TestBed.inject(ClienteService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve consultar OS pelo id', () => {
    const osMock = {
      "id": 1,
      "dataAbertura": "07/11/2024 22:46",
      "dataFechamento": "07/11/2024 22:46", 
      "prioridade": "ALTA",
      "obvervacoes": "Teste create OD",
      "status": "ABERTO",
      "tecnico": 1,
      "cliente": 9
    }

    const os = {
      "id": 1,
      "dataAbertura": "07/11/2024 22:46",
      "dataFechamento": "07/11/2024 22:46", 
      "prioridade": 2,
      "obvervacoes": "Teste create OD",
      "status": 0,
      "tecnico": 1,
      "cliente": 9
    }

    spyOn(service, 'findById').and.returnValue(of(osMock));
    component.findById();

    expect(service.findById).toHaveBeenCalledTimes(1);
    expect(component.os).toEqual(os);
  });

  it('Deve atualizar ordem de serviço e navegar para o componente OS', () => {
    const os = {
      "id": 1,
      "dataAbertura": "07/11/2024 22:46",
      "dataFechamento": "07/11/2024 22:46", 
      "prioridade": 2,
      "obvervacoes": "Teste create OD",
      "status": 0,
      "tecnico": 1,
      "cliente": 9
    }

    spyOn(service, 'update').and.returnValue(of(os));
    spyOn(service, 'message');
    spyOn(router, 'navigate');
    component.update();

    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.message).toHaveBeenCalledWith('Ordem de Serviço atualizada com sucesso!');
    expect(router.navigate).toHaveBeenCalledWith(['os']);
  });

  it('Deve navegar para o componente OS', () => {
    spyOn(router, 'navigate');
    component.cancel();

    expect(router.navigate).toHaveBeenCalledWith(['os']);
  });

  it('Deve listar Técnicos', () => {
    const tecnicos = [
      {
        "id": 1,
        "nome": "Marcos Amaro",
        "cpf": "598.508.200-80",
        "telefone": "(88) 98888-7777"
      },
      {
        "id": 2,
        "nome": "Rodrigo Amaro",
        "cpf": "598.508.200-80",
        "telefone": "(88) 98888-7777"
      }
    ]
    spyOn(tecnicoService, 'findAll').and.returnValue(of(tecnicos));
    component.listarTecnicos();

    expect(tecnicoService.findAll).toHaveBeenCalledTimes(1);
    expect(component.tecnicos.length).toEqual(2);
    expect(component.tecnicos).toEqual(tecnicos);
  });

  it('Deve listar Clientes', () => {
    const clientes = [
      {
        "id": 1,
        "nome": "Marcos Amaro",
        "cpf": "598.508.200-80",
        "telefone": "(88) 98888-7777"
      },
      {
        "id": 2,
        "nome": "Rodrigo Amaro",
        "cpf": "598.508.200-80",
        "telefone": "(88) 98888-7777"
      }
    ]
    spyOn(clienteService, 'findAll').and.returnValue(of(clientes));
    component.listarClientes();

    expect(clienteService.findAll).toHaveBeenCalledTimes(1);
    expect(component.clientes.length).toEqual(2);
    expect(component.clientes).toEqual(clientes);
  });

  it('Deve converter status e prioridade para 0', () => {
    component.os = {
      "id": 1,
      "dataAbertura": "11/11/2024 21:12",
      "dataFechamento": null,
      "prioridade": "BAIXA",
      "obvervacoes": "Teste create OD",
      "status": "ABERTO",
      "tecnico": 1,
      "cliente": 9
  }
      
    component.converteDados();

    expect(component.os.status).toEqual(0);
  });

  it('Deve converter status e prioridade para 1', () => {
    component.os = {
      "id": 1,
      "dataAbertura": "11/11/2024 21:12",
      "dataFechamento": null,
      "prioridade": "MEDIA",
      "obvervacoes": "Teste create OD",
      "status": "ANDAMENTO",
      "tecnico": 1,
      "cliente": 9
  }
      
    component.converteDados();

    expect(component.os.status).toEqual(1);
  });

  it('Deve converter status e prioridade para 2', () => {
    component.os = {
      "id": 1,
      "dataAbertura": "11/11/2024 21:12",
      "dataFechamento": null,
      "prioridade": "ALTA",
      "obvervacoes": "Teste create OD",
      "status": "NOVO",
      "tecnico": 1,
      "cliente": 9
  }
      
    component.converteDados();

    expect(component.os.status).toEqual(2);
  });

});

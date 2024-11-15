import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsCreateComponent } from './os-create.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OsService } from 'src/app/services/os.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';

fdescribe('OsCreateComponent', () => {
  let component: OsCreateComponent;
  let fixture: ComponentFixture<OsCreateComponent>;
  let service: OsService;
  let router: Router;
  let tecnico: TecnicoService;
  let cliente: ClienteService;

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
      declarations: [OsCreateComponent]
    });
    fixture = TestBed.createComponent(OsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(OsService);
    router = TestBed.inject(Router);
    tecnico = TestBed.inject(TecnicoService);
    cliente = TestBed.inject(ClienteService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve crir OS e navegar para o componente "OS"', () => {
    const os = {
      tecnico: 'Rodrigo',
      cliente: 'Marcos',
      obvervacoes: 'Teste',
      status: 'Em andamento',
      prioridade: 'baixa'
    }

    spyOn(service, 'create').and.returnValue(of(os));
    spyOn(service, 'message');
    spyOn(router, 'navigate');
    component.create();

    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.message).toHaveBeenCalledWith('Ordem de Serviço criada com sucesso!');
    expect(router.navigate).toHaveBeenCalledWith(['os']);
  });

  it('Deve navegar para o componente "OS"', () => {
    spyOn(router, 'navigate');
    component.cancel();

    expect(router.navigate).toHaveBeenCalledWith(['os']);
  });

  it('Deve listar Técnicos', () => {
    const mockTecnicos = [
      {
        "id": 9,
        "nome": "Rodrigo Amaro",
        "cpf": "598.508.200-80",
        "telefone": "(88) 98888-7777"
      },
      {
        "id": 1,
        "nome": "Marcos Pereira",
        "cpf": "198.508.200-80",
        "telefone": "(88) 48888-7777"
      }
    ] as Tecnico[];

    spyOn(tecnico,'findAll').and.returnValue(of(mockTecnicos));
    component.listarTecnicos();

    expect(tecnico.findAll).toHaveBeenCalledTimes(1);
    expect(component.tecnicos).toEqual(mockTecnicos);
  });

  it('Deve listar Clientes', () => {
    const mockClientes = [
      {
        "id": 9,
        "nome": "Rodrigo Amaro",
        "cpf": "598.508.200-80",
        "telefone": "(88) 98888-7777"
      },
      {
        "id": 1,
        "nome": "Marcos Pereira",
        "cpf": "198.508.200-80",
        "telefone": "(88) 48888-7777"
      }
    ] as Cliente[];

    spyOn(cliente,'findAll').and.returnValue(of(mockClientes));
    component.listarClientes();

    expect(cliente.findAll).toHaveBeenCalledTimes(1);
    expect(component.clientes).toEqual(mockClientes);

  });
});

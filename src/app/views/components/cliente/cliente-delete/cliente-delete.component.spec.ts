import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDeleteComponent } from './cliente-delete.component';
import { ClienteService } from 'src/app/services/cliente.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('ClienteDeleteComponent', () => {
  let component: ClienteDeleteComponent;
  let fixture: ComponentFixture<ClienteDeleteComponent>;
  let service: ClienteService;
  let router: Router;

  const cliente = {
    "id": 9,
    "nome": "Rodrigo Amaro",
    "cpf": "598.508.200-80",
    "telefone": "(88) 98888-7777"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        MatSnackBarModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule,
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
      declarations: [ClienteDeleteComponent]
    })

    fixture = TestBed.createComponent(ClienteDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ClienteService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve consultar cliente pelo Id', () => {
    spyOn(service, 'findById').and.returnValue(of(cliente))
    component.findById()
    expect(service.findById).toHaveBeenCalledTimes(1)
  });

  it('Deve deletar cliente', () => {
    spyOn(service, 'delete').and.returnValue(of(void 0))
    spyOn(router, 'navigate')
    spyOn(service, 'message')
    component.delete()
    expect(service.delete).toHaveBeenCalledTimes(1)
    expect(router.navigate).toHaveBeenCalledWith(['clientes'])
    expect(service.message).toHaveBeenCalledWith('Cliente deletado com sucesso!')
  });

  it('Deve exibir mensagem de erro ao deletar cliente', () => {
    const errorResponse = { error: { erros: 'Cliente possui Ordens de Serviço' } };
    spyOn(service, 'delete').and.returnValue(throwError(() => errorResponse));
    spyOn(service, 'message');
    component.delete();
    expect(service.message).toHaveBeenCalledWith('Cliente possui Ordens de Serviço');
  });

  it('Deve navegar para o componente passado', () => {
    spyOn(router, 'navigate')
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['clientes'])
  });

});

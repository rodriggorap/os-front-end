import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteUpdateComponent } from './cliente-update.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteService } from 'src/app/services/cliente.service';
import { inject } from '@angular/core';
import { of, throwError } from 'rxjs';

fdescribe('ClienteUpdateComponent', () => {
  let component: ClienteUpdateComponent;
  let fixture: ComponentFixture<ClienteUpdateComponent>;
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
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [ClienteUpdateComponent],
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
    });
    fixture = TestBed.createComponent(ClienteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(ClienteService);
    router = TestBed.inject(Router)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve atualizar cliente', () => {
    spyOn(service, 'update').and.returnValue(of(cliente));
    spyOn(router, 'navigate');
    spyOn(service, 'message');
    component.update();
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['clientes']);
    expect(service.message).toHaveBeenCalledWith('Cliente atualizado com sucesso!');
  });

  it('Deve exibir mensagem de erro "Já cadastrado"', () => {
    const errorResponse = { error: { erros: 'Cliente já cadastrado' } };
    spyOn(service, 'update').and.returnValue(throwError(() => errorResponse));
    spyOn(service, 'message');
    component.update();
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.message).toHaveBeenCalledWith('Cliente já cadastrado');
  });

  it('Deve exibir mensagem de erro "Campos obrigatórios não preenchidos!"', () => {
    const errorResponse = { error: { errors: [{ message: 'requerido' }] } };
    spyOn(service, 'update').and.returnValue(throwError(() => errorResponse));
    spyOn(service, 'message');
    component.update();
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.message).toHaveBeenCalledWith('Campos obrigatórios não preenchidos!');
  });

  it('Deve exibir mensagem de erro "CPF inválido!"', () => {
    const errorResponse = { error: { errors: [{ message: 'contribuinte' }] } };
    spyOn(service, 'update').and.returnValue(throwError(() => errorResponse));
    spyOn(service, 'message');
    component.update();
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.message).toHaveBeenCalledWith('CPF inválido!');
  });

  it('Deve consultar cliente pelo Id', () => {
    spyOn(service, 'findById').and.returnValue(of(cliente));
    component.findById();
    expect(service.findById).toHaveBeenCalledTimes(1);
    expect(component.cliente).toEqual(cliente);
  });

  it('Deve navegar para o componente "clientes"', () => {
    spyOn(router, 'navigate');
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['clientes']);
  });

  it('Deve retornar que o campo "Nome" é inválido', () => {
    expect(component.errorValidName()).toBe('O nome deve ter entre 5 e 100 caracteres!'); 
  });

  it('Deve retornar que o campo "Nome" é válido (menos de 5 caracteres)', () => {
    component.nome.setValue('Rodr')
    expect(component.errorValidName()).toBe('O nome deve ter entre 5 e 100 caracteres!'); 
  });

  it('deve retornar mensagem de erro se o nome for inválido (mais de 100 caracteres)', () => {
    component.nome.setValue('A'.repeat(101));
    expect(component.errorValidName()).toBe('O nome deve ter entre 5 e 100 caracteres!');
  });

  it('Deve retornar que o campo "Nome" é válido', () => {
    component.nome.setValue('Rodrigo')
    expect(component.errorValidName()).toBe(false); 
  });

  it('Deve retornar que o campo "CPF" é inválido', () => {
    expect(component.errorValidCpf()).toBe('O CPF deve ter 11 caracteres!'); 
  });

  it('Deve retornar que o campo "CPF" é inválido (menos de 11 caracteres)', () => {
    component.cpf.setValue('0097310719')
    expect(component.errorValidCpf()).toBe('O CPF deve ter 11 caracteres!'); 
  });

  it('deve retornar mensagem de erro se o nome for inválido (mais de 15 caracteres)', () => {
    component.cpf.setValue('1'.repeat(16));
    expect(component.errorValidCpf()).toBe('O CPF deve ter 11 caracteres!');
  });

  it('Deve retornar que o campo "CPF" é válido', () => {
    component.cpf.setValue('00973107197')
    expect(component.errorValidCpf()).toBe(false); 
  });

  it('Deve retornar que o campo "Telefone" é inválido', () => {
    expect(component.errorValidTelefone()).toBe('O telefone deve ter 11 caracteres!'); 
  });

  it('Deve retornar que o campo "Telefone" é inválido (menos de 11 caracteres)', () => {
    component.telefone.setValue('6198521997')
    expect(component.errorValidTelefone()).toBe('O telefone deve ter 11 caracteres!'); 
  });

  it('deve retornar que o campo "Telefone" é inválido (mais de 15 caracteres)', () => {
    component.telefone.setValue('1'.repeat(16));
    expect(component.errorValidTelefone()).toBe('O telefone deve ter 11 caracteres!');
  });

  it('Deve retornar que o campo "Telefone" é válido', () => {
    component.telefone.setValue('61985219778')
    expect(component.errorValidTelefone()).toBe(false); 
  });
  
});

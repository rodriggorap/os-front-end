import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoCreateComponent } from './tecnico-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { of, throwError } from 'rxjs';

fdescribe('TecnicoCreateComponent', () => {
  let component: TecnicoCreateComponent;
  let fixture: ComponentFixture<TecnicoCreateComponent>;
  let router: Router;
  let service: TecnicoService;

  const tecnico = {
    "id": 9,
    "nome": "Rodrigo Amaro",
    "cpf": "598.508.200-80",
    "telefone": "(88) 98888-7777"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        MatSnackBarModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [TecnicoCreateComponent]
    });
    fixture = TestBed.createComponent(TecnicoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    service = TestBed.inject(TecnicoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve navegar para o componente "tecnicos"', () => {
    spyOn(router, 'navigate');
    component.cancel();

    expect(router.navigate).toHaveBeenCalledWith(['tecnicos']);
  });

  it('Deve criar um técnico', () => {
    spyOn(service, 'create').and.returnValue(of(tecnico));
    spyOn(router, 'navigate');
    spyOn(service, 'message');
    component.create();

    expect(service.create).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['tecnicos']);
    expect(service.message).toHaveBeenCalledWith('Técnico criado com sucesso!');
  });

  it('Deve retonar mensagem de erro "já cadastrado"', () => {
    const errorResponse = { error: { erros: 'já cadastrado'}};
    spyOn(service, 'create').and.returnValue(throwError(() => errorResponse));
    spyOn(service, 'message');
    component.create();

    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.message).toHaveBeenCalledWith('já cadastrado')
  });

  it('Deve retonar mensagem de erro "Campos obrigatórios não preenchidos!"', () => {
    const errorResponse = { error: { errors: [ { message: 'requerido' } ] } };
    spyOn(service, 'create').and.returnValue(throwError(() => errorResponse));
    spyOn(service, 'message');
    component.create();

    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.message).toHaveBeenCalledWith('Campos obrigatórios não preenchidos!');
  });

  it('Deve retonar mensagem de erro "CPF inválido!"', () => {
    const errorResponse = { error: { errors: [ { message: 'contribuinte' } ] } };
    spyOn(service, 'create').and.returnValue(throwError(() => errorResponse));
    spyOn(service, 'message');
    component.create();

    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.message).toHaveBeenCalledWith('CPF inválido!');
  });

  it('Deve retornar que o campo "Nome" é válido"', () => {
    component.nome.setValue('Rodrigo');
    component.errorValidName();

    expect(component.errorValidName()).toBe(false);
  });

  it('Deve retornar mensagem de erro "O nome deve ter entre 5 e 100 caracteres!" (menos de 5 caracteres)', () => {
    component.nome.setValue('Rodr');
    component.errorValidName();

    expect(component.errorValidName()).toBe('O nome deve ter entre 5 e 100 caracteres!');
  });

  it('Deve retornar mensagem de erro "O nome deve ter entre 5 e 100 caracteres!" (mais de 100 caracteres)', () => {
    component.nome.setValue('R'.repeat(101));
    component.errorValidName();

    expect(component.errorValidName()).toBe('O nome deve ter entre 5 e 100 caracteres!');
  });

  it('Deve retornar que o campo "CPF" é válido"', () => {
    component.cpf.setValue('000.731.071-97');
    component.errorValidCpf();

    expect(component.errorValidCpf()).toBe(false);
  });

  it('Deve retornar mensagem de erro "O CPF deve ter 11 caracteres! (Menos de 11 caracteres)"', () => {
    component.cpf.setValue('009.731.071.9');
    component.errorValidCpf();

    expect(component.errorValidCpf()).toBe('O CPF deve ter 11 caracteres!');
  });

  it('Deve retornar mensagem de erro "O CPF deve ter 11 caracteres! (Mais de 11 caracteres)"', () => {
    component.cpf.setValue('009.731.071.9777');
    component.errorValidCpf();

    expect(component.errorValidCpf()).toBe('O CPF deve ter 11 caracteres!');
  });

  it('Deve retornar que o campo "Telefone" é válido"', () => {
    component.telefone.setValue('61985219778');
    component.errorValidTelefone();

    expect(component.errorValidTelefone()).toBe(false);
  });

  it('Deve retornar mensagem de erro "O Telefone deve ter 11 caracteres! (Menos de 11 caracteres)"', () => {
    component.telefone.setValue('6198521977');
    component.errorValidTelefone();

    expect(component.errorValidTelefone()).toBe('O telefone deve ter 11 caracteres!');
  });

  it('Deve retornar mensagem de erro "O Telefone deve ter 11 caracteres! (Mais de 11 caracteres)"', () => {
    component.telefone.setValue('9999999999999999');
    component.errorValidTelefone();

    expect(component.errorValidTelefone()).toBe('O telefone deve ter 11 caracteres!');
  });


});

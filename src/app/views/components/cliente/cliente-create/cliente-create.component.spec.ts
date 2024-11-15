import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCreateComponent } from './cliente-create.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ClienteService } from 'src/app/services/cliente.service';
import { of, throwError } from 'rxjs';

fdescribe('ClienteCreateComponent', () => {
  let component: ClienteCreateComponent;
  let fixture: ComponentFixture<ClienteCreateComponent>;
  let router: Router;
  let service: ClienteService;

  const cliente = {
    "id": 9,
    "nome": "Rodrigo Amaro",
    "cpf": "598.508.200-80",
    "telefone": "(88) 98888-7777"
  }

  const cliente2 = {
    "id": 9,
    "nome": "",
    "cpf": "598.508.200-80",
    "telefone": "(88) 98888-7777"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule],
      providers: [MatSnackBar],
      declarations: [ClienteCreateComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ClienteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    service = TestBed.inject(ClienteService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve navegar para o componente passado', () => {
    spyOn(router, 'navigate')
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['clientes'])
  });

  it('Deve retornar que o campo "Nome" é inválido', () => {
    const result = component.errorValidName();
    expect(result).toBe('O nome deve ter entre 5 e 100 caracteres!'); 
  });

  it('Deve retornar que o campo "Nome" é válido', () => {
    component.nome.setValue('Rodrigo')
    const result = component.errorValidName();
    expect(result).toBe(false); 
  });

  it('Deve retornar que o campo "CPF" é inválido', () => {
    const result = component.errorValidCpf();
    expect(result).toBe('O CPF deve ter 11 caracteres!'); 
  });

  it('Deve retornar que o campo "CPF" é válido', () => {
    component.cpf.setValue('598.508.200-80')
    const result = component.errorValidCpf();
    expect(result).toBe(false); 
  });

  it('Deve retornar que o campo "Telefone" é inválido', () => {
    const result = component.errorValidTelefone();
    expect(result).toBe('O telefone deve ter 11 caracteres!'); 
  });

  it('Deve retornar que o campo "Telefone" é válido', () => {
    component.telefone.setValue('(88) 98888-7777')
    const result = component.errorValidTelefone();
    expect(result).toBe(false); 
  });

  it('Deve estar desabilitado o botão quando o formúlario for inválido', () => {
    const button = fixture.debugElement
    expect(button.nativeElement.querySelector('#create').disabled).toBeTrue(); 
  });

  it('Deve estar habilitado o botão quando o formúlario for válido', () => {
    component.nome.setValue('Rodrigo')
    component.cpf.setValue('598.508.200-80')
    component.telefone.setValue('(88) 98888-7777')

    const button = fixture.debugElement
    fixture.detectChanges();
    expect(button.nativeElement.querySelector('#create').disabled).toBeFalse(); 
  });

  it('Deve cadastrar cliente', () => {
    spyOn(service, 'create').and.returnValue(of(cliente))
    spyOn(router, 'navigate')
    spyOn(service, 'message')
    component.create()
    expect(service.create).toHaveBeenCalledTimes(1)
    expect(router.navigate).toHaveBeenCalledWith(['clientes'])
    expect(service.message).toHaveBeenCalledWith('Cliente criado com sucesso!')
  }); 


  it('Deve exibir mensagem de erro cliente já cadastrado', () => {
    const errorResponse = { error: { erros: 'Cliente já cadastrado' } };
    spyOn(service, 'create').and.returnValue(throwError(() => errorResponse))
    spyOn(service, 'message')
    component.create()
    expect(service.message).toHaveBeenCalledWith('Cliente já cadastrado')
  }); 

  it('Deve exibir mensagem de erro para campos obrigatórios não preenchidos', () => {
    const errorResponse = { error: { errors: [{ message: 'requerido' }] } };
    spyOn(service, 'create').and.returnValue(throwError(() => errorResponse));
    spyOn(service, 'message');
    component.create();
    expect(service.message).toHaveBeenCalledWith('Campos obrigatórios não preenchidos!');
  });
  
  it('Deve exibir mensagem de erro para CPF inválido!', () => {
    const errorResponse = { error: { errors: [{ message: 'contribuinte' }] } };
    spyOn(service, 'create').and.returnValue(throwError(() => errorResponse));
    spyOn(service, 'message');
    component.create();
    expect(service.message).toHaveBeenCalledWith('CPF inválido!');
  }); 


});

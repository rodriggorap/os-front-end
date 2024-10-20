import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(14)])
  telefone = new FormControl('', [Validators.minLength(11)])

  constructor(
    private router: Router,
    private service: ClienteService) { }

  ngOnInit(): void {

  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }

  create(): void {
    this.service.create(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.message('Cliente criado com sucesso!')
    }, err => {
      console.log(err)
      if (err.error.erros.match('já cadastrado')) {
        this.service.message(err.error.erros)
      } else if (err.error.errors[0].message.match('requerido')) {
        this.service.message('Campos obrigatórios não preenchidos!')
      }else if (err.error.errors[0].message.match('contribuinte')) {
        this.service.message('CPF inválido!')
      }
    })
  }

errorValidName() {
  if(this.nome.invalid) {
    return 'O nome deve ter entre 5 e 100 caracteres!';
  }
  return false;
}

errorValidCpf() {
  if(this.cpf.invalid) {
    return 'O CPF deve ter 11 caracteres!';
  }
  return false;
}

errorValidTelefone() {
  if(this.telefone.invalid) {
    return 'O telefone deve ter 11 caracteres!';
  }
  return false;
}

}

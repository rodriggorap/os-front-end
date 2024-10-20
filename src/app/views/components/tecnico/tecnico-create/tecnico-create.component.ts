import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
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
    private service: TecnicoService) { }

  ngOnInit(): void {

  }

  cancel(): void {
    this.router.navigate(['tecnicos'])
  }

  create(): void {
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.service.message('Técnico criado com sucesso!')
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

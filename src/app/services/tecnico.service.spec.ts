import { TestBed } from '@angular/core/testing';

import { TecnicoService } from './tecnico.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('TecnicoService', () => {
  let service: TecnicoService;
  let httpTestingController: HttpTestingController;
  let baseUrl: String;

  const id = 1;
  const tecnico = {
    "id": 9,
    "nome": "Rodrigo Amaro",
    "cpf": "598.508.200-80",
    "telefone": "(88) 98888-7777"
  }

  const tecnicos = [{
    "id": 9,
    "nome": "Rodrigo Amaro",
    "cpf": "598.508.200-80",
    "telefone": "(88) 98888-7777"
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [MatSnackBar]
    });
    service = TestBed.inject(TecnicoService);
    httpTestingController = TestBed.inject(HttpTestingController);
    baseUrl = environment.baseUrl;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chamada GET por id', () => {
    service.findById(id).subscribe(resposta => {
      expect(resposta).toBe(tecnico);
    })
    const request = httpTestingController.expectOne(baseUrl + "/tecnicos/" + id);
    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(baseUrl + "/tecnicos/" + id);
    request.flush(tecnico);
  })

  it('Deve realizar chamada GET para obter tecnicos', () => {
    service.findAll().subscribe(resposta => {
      expect(resposta).toBe(tecnicos);
    })
    const request = httpTestingController.expectOne(baseUrl + "/tecnicos");
    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(baseUrl + "/tecnicos");
    request.flush(tecnicos);
  })

  it('Deve realizar chamada GET para criar técnico', () => {
    service.create(tecnico).subscribe(resposta => {
      expect(resposta).toBe(tecnico);
    })
    const request = httpTestingController.expectOne(baseUrl + "/tecnicos");
    expect(request.request.method).toBe('POST');
    expect(request.request.url).toBe(baseUrl + "/tecnicos");
    request.flush(tecnico);
  })

  it('Deve realizar chamada GET para atualzar tecnico', () => {
    service.update(tecnico).subscribe(resposta => {
      expect(resposta).toBe(tecnico);
    })
    const request = httpTestingController.expectOne(baseUrl + "/tecnicos/" + tecnico.id);
    expect(request.request.method).toBe('PUT');
    expect(request.request.url).toBe(baseUrl + "/tecnicos/" + tecnico.id);
    request.flush(tecnico);
  })

  it('Deve deletar tecnico', () => {
    service.delete(id).subscribe(resposta => {
      expect(resposta).toBe();
    })
    const request = httpTestingController.expectOne(baseUrl + "/tecnicos/" + id);
    expect(request.request.method).toBe('DELETE');
    expect(request.request.url).toBe(baseUrl + "/tecnicos/" + id);
    //request.flush();
  })

  it('Deve exibir mensagem', () => {
    const msg = "cadastro com sucesso!";
    service.message(msg);
    expect(msg).toBe('cadastro com sucesso!');
  })

});

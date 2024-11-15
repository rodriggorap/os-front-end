import { TestBed } from '@angular/core/testing';
import { ClienteService } from './cliente.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationDurations } from '@angular/material/core';

fdescribe('ClienteService', () => {
  let service: ClienteService;
  let httpTestingController: HttpTestingController;
  let baseUrl: String;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const id = 1;
  const cliente = {
    "id": 9,
    "nome": "Rodrigo Amaro",
    "cpf": "598.508.200-80",
    "telefone": "(88) 98888-7777"
  }

  const clientes = [{
    "id": 9,
    "nome": "Rodrigo Amaro",
    "cpf": "598.508.200-80",
    "telefone": "(88) 98888-7777"
  }]

  beforeEach(() => {
    const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [{provide: MatSnackBar, useValue: snackBarSpyObj }]

    });
    service = TestBed.inject(ClienteService);
    httpTestingController = TestBed.inject(HttpTestingController);
    baseUrl = environment.baseUrl;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chamada GET por id', () => {
    service.findById(id).subscribe(resposta => {
      expect(resposta).toBe(cliente);
    })
    const request = httpTestingController.expectOne(baseUrl + "/clientes/" + id);
    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(baseUrl + "/clientes/" + id);
    request.flush(cliente);
  })

  it('Deve realizar chamada GET para obter clientes', () => {
    service.findAll().subscribe(resposta => {
      expect(resposta).toBe(clientes);
    })
    const request = httpTestingController.expectOne(baseUrl + "/clientes");
    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(baseUrl + "/clientes");
    request.flush(clientes);
  })

  it('Deve realizar chamada POST para criar cliente', () => {
    service.create(cliente).subscribe(resposta => {
      expect(resposta).toBe(cliente);
    })
    const request = httpTestingController.expectOne(baseUrl + "/clientes");
    expect(request.request.method).toBe('POST');
    expect(request.request.url).toBe(baseUrl + "/clientes");
    request.flush(cliente);
  })

  it('Deve realizar chamada PUT para atualzar cliente', () => {
    service.update(cliente).subscribe(resposta => {
      expect(resposta).toBe(cliente);
    })
    const request = httpTestingController.expectOne(baseUrl + "/clientes/" + cliente.id);
    expect(request.request.method).toBe('PUT');
    expect(request.request.url).toBe(baseUrl + "/clientes/" + cliente.id);
    request.flush(cliente);
  })

  it('Deve deletar cliente', () => {
    service.delete(id).subscribe(resposta => {
      expect(resposta).toBe();
    })
    const request = httpTestingController.expectOne(baseUrl + "/clientes/" + id);
    expect(request.request.method).toBe('DELETE');
    expect(request.request.url).toBe(baseUrl + "/clientes/" + id);
    //request.flush();
  })

  it('Deve exibir mensagem', () => {
    const msg = "cadastro com sucesso!";
    service.message(msg)
    expect(snackBar.open).toHaveBeenCalledWith(
      msg,
      'OK',
      {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 4000
      }
    );
  })


});

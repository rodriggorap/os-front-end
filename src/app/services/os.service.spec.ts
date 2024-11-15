import { TestBed } from '@angular/core/testing';

import { OsService } from './os.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

fdescribe('OsService', () => {
  let service: OsService;
  let httpTestingController: HttpTestingController;
  let baseUrl: String;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  const id = 1;
  const oss = [
    {
      "id": 1,
      "dataAbertura": "21/10/2024 21:48",
      "dataFechamento": null,
      "prioridade": "ALTA",
      "obvervacoes": "Teste create OD",
      "status": "ANDAMENTO",
      "tecnico": 1,
      "cliente": 9
    }
  ]

  const os = {
    "id": 1,
    "dataAbertura": "21/10/2024 21:48",
    "dataFechamento": null,
    "prioridade": "ALTA",
    "obvervacoes": "Teste create OD",
    "status": "ANDAMENTO",
    "tecnico": 1,
    "cliente": 9
  }


  beforeEach(() => {
    const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [{provide: MatSnackBar, useValue: snackBarSpyObj }]
    });
    service = TestBed.inject(OsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    baseUrl = environment.baseUrl;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chamada GET para OS', () => {

    service.findAll().subscribe(resposta => {
      expect(resposta).toBe(oss)
    })
    const request = httpTestingController.expectOne(baseUrl + "/os");
    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(baseUrl + "/os");
    request.flush(oss);
  });

  it('Deve realizar chamada GET por id', () => {
    service.findById(id).subscribe(resposta => {
      expect(resposta).toBe(os)
    })
    const request = httpTestingController.expectOne(baseUrl + "/os/" + id);
    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(baseUrl + "/os/" + id);
    request.flush(os);
  });

  it('Deve criar OS', () => {

    service.create(os).subscribe(resposta => {
      expect(resposta).toBe(os)
    })
    const request = httpTestingController.expectOne(baseUrl + "/os");
    expect(request.request.method).toBe('POST');
    expect(request.request.url).toBe(baseUrl + "/os");
    request.flush(os);
  });

  it('Deve atualizar OS', () => {

    service.update(os).subscribe(resposta => {
      expect(resposta).toBe(os)
    })
    const request = httpTestingController.expectOne(baseUrl + "/os");
    expect(request.request.method).toBe('PUT');
    expect(request.request.url).toBe(baseUrl + "/os");
    request.flush(os);
  });

  it('Deve deletar OS', () => {

    service.delete(id).subscribe(resposta => {
      expect(resposta).toBe()
    })
    const request = httpTestingController.expectOne(baseUrl + "/os/" + id);
    expect(request.request.method).toBe('DELETE');
    expect(request.request.url).toBe(baseUrl + "/os/" + id);
  });

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

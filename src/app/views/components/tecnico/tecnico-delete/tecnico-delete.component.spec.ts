import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoDeleteComponent } from './tecnico-delete.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { of, throwError } from 'rxjs';

fdescribe('TecnicoDeleteComponent', () => {
  let component: TecnicoDeleteComponent;
  let fixture: ComponentFixture<TecnicoDeleteComponent>;
  let tecnicoService: TecnicoService;
  let router: Router;

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
      declarations: [TecnicoDeleteComponent]
    });
    fixture = TestBed.createComponent(TecnicoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tecnicoService = TestBed.inject(TecnicoService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve consultar técnico pelo Id', () => {
    const tecnico = {
      "id": 9,
      "nome": "Rodrigo Amaro",
      "cpf": "598.508.200-80",
      "telefone": "(88) 98888-7777"
    }
    spyOn(tecnicoService, 'findById').and.returnValue(of(tecnico));
    component.findById();

    expect(tecnicoService.findById).toHaveBeenCalledTimes(1);
    expect(component.tecnico).toEqual(tecnico);
  });

  it('Deve deletar Técnico', () => {
    spyOn(tecnicoService, 'delete').and.returnValue(of(void 0));
    spyOn(router, 'navigate');
    spyOn(tecnicoService, 'message');
    component.delete();

    expect(tecnicoService.delete).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['tecnicos']);
    expect(tecnicoService.message).toHaveBeenCalledWith('Técnico deletado com sucesso!');
  });

  it('Deve retornar a mensagem de erro "Técnico possui Ordens de Serviço"', () => {
    const errorResponse = { error: { erros: 'Técnico possui Ordens de Serviço' } };
    spyOn(tecnicoService, 'delete').and.returnValue(throwError(() => errorResponse));
    spyOn(tecnicoService, 'message');
    component.delete();

    expect(tecnicoService.delete).toHaveBeenCalledTimes(1);
    expect(tecnicoService.message).toHaveBeenCalledWith('Técnico possui Ordens de Serviço');
  });

  it('Deve navegar para o componente Tecnicos', () => {
    spyOn(router, 'navigate');
    component.cancel();

    expect(router.navigate).toHaveBeenCalledWith(['tecnicos']);
  });
});

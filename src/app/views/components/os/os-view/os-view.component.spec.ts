import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsViewComponent } from './os-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { OsService } from 'src/app/services/os.service';
import { of } from 'rxjs';

fdescribe('OsViewComponent', () => {
  let component: OsViewComponent;
  let fixture: ComponentFixture<OsViewComponent>;
  let service: OsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        MatSnackBarModule,
        MatCardModule
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
      declarations: [OsViewComponent]
    });
    fixture = TestBed.createComponent(OsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(OsService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve pesquisar OS pelo Id', () => {
    const os = {
      "id": 1,
      "dataAbertura": "11/11/2024 21:12",
      "dataFechamento": null,
      "prioridade": "ALTA",
      "obvervacoes": "Teste create OD",
      "status": "ANDAMENTO",
      "tecnico": 1,
      "cliente": 9
  }
    spyOn(service, 'findById').and.returnValue(of(os));
    component.findById();

    expect(service.findById).toHaveBeenCalledTimes(1);
    expect(component.os).toEqual(os);
  });

  it('Deve navegar para o componente OS', () => {
    spyOn(router, 'navigate');
    component.return();
    
    expect(router.navigate).toHaveBeenCalledWith(['os']);
  });
});

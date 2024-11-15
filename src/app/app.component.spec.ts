import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/components/template/header/header.component';
import { NavComponent } from './views/components/template/nav/nav.component';
import { FooterComponent } from './views/components/template/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNavList } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

fdescribe('AppComponent', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, 
      MatToolbarModule, 
      BrowserAnimationsModule, 
      MatMenuModule, 
      MatIconModule],
    declarations: [AppComponent, 
      HeaderComponent, 
      NavComponent, 
      FooterComponent, 
      MatDrawerContainer, 
      MatDrawer, 
      MatNavList, 
      MatDrawerContent],
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'os2'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('os2');
  });

});

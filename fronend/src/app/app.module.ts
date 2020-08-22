import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import{AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistasComponent } from './artistas/artistas.component';
import { NavbarComponent } from './navbar/navbar.component';
//import { RegistroComponent } from './registro/registro.component';

import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    ArtistasComponent,
    NavbarComponent,
  
    //RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MonacoEditorModule,
    NgbModule
  
  ],

  exports:[
    NavbarComponent 
  ],
  
  providers: [AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

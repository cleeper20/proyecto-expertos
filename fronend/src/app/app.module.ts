import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistasComponent } from './artistas/artistas.component';
import { NavbarComponent } from './navbar/navbar.component';
//import { RegistroComponent } from './registro/registro.component';

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
    HttpClientModule
  ],

  exports:[
    NavbarComponent 
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

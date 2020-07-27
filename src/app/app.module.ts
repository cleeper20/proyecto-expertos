import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    AppRoutingModule
  ],

  exports:[
    NavbarComponent 
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

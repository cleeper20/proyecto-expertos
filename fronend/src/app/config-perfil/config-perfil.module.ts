import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigPerfilRoutingModule } from './config-perfil-routing.module';
import { ConfigPerfilComponent } from './config-perfil.component';

import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'



@NgModule({
  declarations: [ConfigPerfilComponent],
  imports: [
    CommonModule,
    ConfigPerfilRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ConfigPerfilModule { }

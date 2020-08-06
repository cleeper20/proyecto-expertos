import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigPerfilRoutingModule } from './config-perfil-routing.module';
import { ConfigPerfilComponent } from './config-perfil.component';


@NgModule({
  declarations: [ConfigPerfilComponent],
  imports: [
    CommonModule,
    ConfigPerfilRoutingModule
  ]
})
export class ConfigPerfilModule { }

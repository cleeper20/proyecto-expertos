import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigPerfilComponent } from './config-perfil.component';

const routes: Routes = [{ path: '', component: ConfigPerfilComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigPerfilRoutingModule { }

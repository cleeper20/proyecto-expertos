import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './auth.guard';


//import {RegistroComponent} from './registro/registro.component';


const routes: Routes = [
  { path:'', redirectTo: '/home',  pathMatch: 'full'},

  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'workShop', loadChildren: () => import('./area-trabajo/area-trabajo.module').then(m => m.AreaTrabajoModule), canActivate:[AuthGuard] },
  { path: 'config', loadChildren: () => import('./config-perfil/config-perfil.module').then(m => m.ConfigPerfilModule), canActivate:[AuthGuard] },
 
 // {path: 'registro', component: RegistroComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

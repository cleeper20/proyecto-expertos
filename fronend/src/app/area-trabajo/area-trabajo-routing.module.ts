import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaTrabajoComponent } from './area-trabajo.component';




const routes: Routes = [
  { path: '', component: AreaTrabajoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaTrabajoRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaTrabajoRoutingModule } from './area-trabajo-routing.module';
import { AreaTrabajoComponent } from './area-trabajo.component';






@NgModule({
  declarations: [AreaTrabajoComponent],
  imports: [
    CommonModule,
    AreaTrabajoRoutingModule,
   
    
  ]
})
export class AreaTrabajoModule { }

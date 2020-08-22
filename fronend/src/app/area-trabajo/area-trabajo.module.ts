import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaTrabajoRoutingModule } from './area-trabajo-routing.module';
import { AreaTrabajoComponent } from './area-trabajo.component';

import { FormsModule } from '@angular/forms';
//importo monaco
import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';






@NgModule({
  declarations: [AreaTrabajoComponent,  SidebarComponent],
  imports: [
    CommonModule,
    AreaTrabajoRoutingModule,
    FormsModule,
    MonacoEditorModule,
    NgbModule
   
    
  ],
})
export class AreaTrabajoModule { }

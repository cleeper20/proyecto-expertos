import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaTrabajoRoutingModule } from './area-trabajo-routing.module';
import { AreaTrabajoComponent } from './area-trabajo.component';
import { EditorComponent } from './components/editor/editor.component';
import { FormsModule } from '@angular/forms';
//importo monaco
import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';






@NgModule({
  declarations: [AreaTrabajoComponent, EditorComponent],
  imports: [
    CommonModule,
    AreaTrabajoRoutingModule,
    FormsModule,
    MonacoEditorModule,
   
    
  ],
})
export class AreaTrabajoModule { }

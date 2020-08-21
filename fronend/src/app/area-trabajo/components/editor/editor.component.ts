import { Component, OnInit } from '@angular/core';
import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  originalCode: string = 'function x() { // TODO }';
  constructor() { }

  ngOnInit(): void {
  }

}

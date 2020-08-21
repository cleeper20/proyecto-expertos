import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { filter, take } from 'rxjs/operators';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor';


@Component({
  selector: 'app-area-trabajo',
  templateUrl: './area-trabajo.component.html',
  styleUrls: ['./area-trabajo.component.css'],
})


export class AreaTrabajoComponent implements OnInit {
  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent;
  editorOptions: MonacoEditorConstructionOptions = {
    theme: 'myCustomTheme',
    language: 'html',
    roundedSelection: true,
    autoIndent: true,
    renderLineHighlight: "all",
    selectionHighlight: true,
  };
  code = this.getCode();

  constructor(
    private authSerive: AuthService,
    private monacoLoaderService: MonacoEditorLoaderService,
  ) {
    this.monacoLoaderService.isMonacoLoaded$
    .pipe(
      filter(isLoaded => isLoaded),
      take(1)
    )
    .subscribe(() => {
      monaco.editor.defineTheme('myCustomTheme', {
        base: 'vs-dark', // can also be vs or hc-black
        inherit: true, // can also be false to completely replace the builtin rules
        rules: [
          {
            token: 'comment',
            foreground: 'ffa500',
            fontStyle: 'italic underline'
          },
          { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
          { token: 'comment.css', foreground: '0000ff' } // will inherit fontStyle from `comment` above
        ],
        colors: {}
      });
    });
    
   }

  ngOnInit(): void {
  }

  logout(){
      this.authSerive.logout();
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    // monaco.editor.setTheme('vs');
    editor.setSelection({
      startLineNumber: 1,
      startColumn: 1,
      endColumn: 50,
      endLineNumber: 3
    });
  }

  getCode() {
    return (
      // tslint:disable-next-line: max-line-length
      '<h1>Hola Mundo</h1>'
    );
  }

}

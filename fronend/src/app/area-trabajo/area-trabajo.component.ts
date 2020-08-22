import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { filter, take } from 'rxjs/operators';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor';

import {CarpetaService} from '../services/carpeta.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-area-trabajo',
  templateUrl: './area-trabajo.component.html',
  styleUrls: ['./area-trabajo.component.css'],
})


export class AreaTrabajoComponent implements OnInit {
  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent;

  editorOptions1: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'html',
    //roundedSelection: true,
    autoIndent: true,
   // renderLineHighlight: "all",
   // selectionHighlight: true,
  };

  editorOptions2: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'javaScript',
    //roundedSelection: true,
    autoIndent: true,
   // renderLineHighlight: "all",
   // selectionHighlight: true,
  };

  editorOptions3: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'css',
    //roundedSelection: true,
    autoIndent: true,
   // renderLineHighlight: "all",
   // selectionHighlight: true,
  };



  code1 = this.getCode1();
  code2 = this.getCode2();
  code3 = this.getCode3();

  //variables
  carpetas=[];
  closeResult = '';
  nombreCarpeta='';
  subCarpetas=[];
  proyectos=[];
  carpetaPadreId='';

  idCarpeta='';
  padre='';

  indice=5;

  tablaOcultar=false;

  constructor(
    private authSerive: AuthService,
    private monacoLoaderService: MonacoEditorLoaderService,
    private carpetaService:CarpetaService,
    private modalService: NgbModal,
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
      this.obtenerCarpetas();
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

  getCode1() {
    return (
      // tslint:disable-next-line: max-line-length
      `<h1>Hola Mundo</h1>`
    );
  }

  getCode2() {
    return (
      // tslint:disable-next-line: max-line-length
      `function holaMundo(){console.log("Hola mundo")}`
      );
    }

    getCode3() {
      return (
        ` <style type="text/css">
          p { color: black; }
         </style> `
        );
      }



  //-----------------moda----------------------
  open(content) {
   

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open2(content2, idCarpeta, padre) {
    this.idCarpeta=idCarpeta;
    this.padre=padre;
   

    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open3(content3, idCarpeta,indice){
    this.idCarpeta=idCarpeta; 
    this.indice=indice; 
   

    this.modalService.open(content3, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //-------------------------funciones

  obtenerCarpetas(){
    this.carpetaService.obtenerCarpetas().subscribe(
      res=>{
        console.log(res);
        this.carpetas=res;
      },
      err=>{
        console.log(err)
      }
    )
  }

  crearCapeta(){

    let datos={
          nombre:this.nombreCarpeta
    }
      this.carpetaService.nuevaCarpeta(datos).subscribe(
        res=>{
            this.obtenerCarpetas();
            this.modalService.dismissAll();
        },
        err=>{
          console.log(err)
        }
      )
  }

  obtenerSubCarpetas(id){
    //console.log(id) rendirzar codigo
   
    
    this.carpetaService.obtenerSubCarpetas(id).subscribe(
      res=>{
        console.log(res);
        this.subCarpetas=res.subCarpetas;
        this.proyectos=res.proyectos
        this.carpetaPadreId=res.padre
      },
      err=>{
        console.log(err);
      }
    ) 

  }

  volverAtras(){
    //console.log(id) rendirzar codigo
    console.log(this.carpetaPadreId);
    this.obtenerSubCarpetas(this.carpetaPadreId);
  }

  

  nuevaCarpetaHija(idCarpeta, padre){
    this.carpetaPadreId=padre;
    this.carpetaService.nuevaCapetaHija(idCarpeta,'nueva carpeta22').subscribe(
      res=>{
      console.log(res);
       this.obtenerSubCarpetas(idCarpeta)     
      },
      err=>{
        console.log(err);
      }
    ) 
  }

  nuevaCarpetaHijaModal(){
    this.carpetaPadreId=this.padre;
    console.log(this.nombreCarpeta);
    this.carpetaService.nuevaCapetaHija(this.idCarpeta,this.nombreCarpeta).subscribe(
      res=>{
      console.log(res);
       this.obtenerSubCarpetas(this.idCarpeta)
       this.modalService.dismissAll();
       this.nombreCarpeta='';     
      },
      err=>{
        console.log(err);
      }
    ) 
  }

  cambiarNombre(){
    if(this.indice == 0){
    console.log(this.idCarpeta)
      this.carpetaService.cambiarNombre(this.nombreCarpeta,this.idCarpeta).subscribe(
        res=>{
        console.log(res);
        this.obtenerCarpetas();
         //this.obtenerSubCarpetas(this.idCarpeta)
         this.modalService.dismissAll();
         this.nombreCarpeta='';     
        },
        err=>{
          console.log(err);
        }
      ) 
    }

    if(this.indice==1){
      console.log(this.idCarpeta)
      this.carpetaService.cambiarNombre(this.nombreCarpeta,this.idCarpeta).subscribe(
        res=>{
        console.log(res);
        //this.obtenerCarpetas();
         this.obtenerSubCarpetas(this.carpetaPadreId)
         this.modalService.dismissAll();
         this.nombreCarpeta='';     
        },
        err=>{
          console.log(err);
        }
      ) 

    }
    
  }

  //eliminar carpetas

  eliminarRaiz(idCarpeta){
    this.carpetaService.eliminarCarpetaRaiz(idCarpeta).subscribe(
      res=>{
      console.log(res);
      this.obtenerCarpetas();
       
      },
      err=>{
        console.log(err);
      }
    ) 
  }

  eliminarCarpetaHija(idHijo,idPadre){
    this.carpetaService.eliminarCarpetahija(idHijo,idPadre).subscribe(
      res=>{
      console.log(res);
      this.obtenerSubCarpetas(idPadre)
       
      },
      err=>{
        console.log(err);
      }
    ) 
  }
  
  


}

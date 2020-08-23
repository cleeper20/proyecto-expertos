import { Component, OnInit, ViewChild,ElementRef , Renderer2  } from '@angular/core';
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
  @ViewChild('iframe') iframe: ElementRef;
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
    language: 'javascript',
    //roundedSelection: true,
    autoIndent: true,
   // renderLineHighlight: "all",
   // selectionHighlight: true,
  };

  editorOptions3: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    language:'css',
    //roundedSelection: true,
    autoIndent: true,
   // renderLineHighlight: "all",
   // selectionHighlight: true,
  };



  code1 = '';
  code2 = '';
  code3 = '';

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

  mostrarTabla=true;
  //variables proyecto
  idCarpetaProyecto='';
  idProyecto='';
  nombreProyecto='';

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
        `h1 {
          color: #FF0000
        }`
        );
      }

//-----------------renderizar-----------
mostrarContenido(){

  let contenido =`
  <style>
  ${this.code3}  
  </style>

  ${this.code1}

  <script>
  ${this.code2}
  
  </script>  
  ` 
  let doc =  this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    doc.open();
    doc.writeln(contenido);
    doc.close();

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

  open4(content4, idCarpeta, padre){

    this.idCarpeta=idCarpeta; 
    this.padre=padre
    
   

    this.modalService.open(content4, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
        //console.log(res);
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
       // console.log(res);
        this.subCarpetas=res.subCarpetas;
        this.proyectos=res.proyectos
        this.carpetaPadreId=res.padre
        this.mostrarTabla=true;
      },
      err=>{
        console.log(err);
      }
    ) 

  }

  volverAtras(){
    //console.log(id) rendirzar codigo
    //console.log(this.carpetaPadreId);
    this.obtenerSubCarpetas(this.carpetaPadreId);
  }

  

  nuevaCarpetaHija(idCarpeta, padre){
    this.carpetaPadreId=padre;
    this.carpetaService.nuevaCapetaHija(idCarpeta,'nueva carpeta22').subscribe(
      res=>{
     // console.log(res);
       this.obtenerSubCarpetas(idCarpeta)     
      },
      err=>{
        console.log(err);
      }
    ) 
  }

  nuevaCarpetaHijaModal(){
    this.carpetaPadreId=this.padre;
    //console.log(this.nombreCarpeta);
    this.carpetaService.nuevaCapetaHija(this.idCarpeta,this.nombreCarpeta).subscribe(
      res=>{
    //  console.log(res);
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
   // console.log(this.idCarpeta)
      this.carpetaService.cambiarNombre(this.nombreCarpeta,this.idCarpeta).subscribe(
        res=>{
       // console.log(res);
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
     // console.log(this.idCarpeta)
      this.carpetaService.cambiarNombre(this.nombreCarpeta,this.idCarpeta).subscribe(
        res=>{
      //  console.log(res);
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
  //    console.log(res);
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
    //  console.log(res);
      this.obtenerSubCarpetas(idPadre)
       
      },
      err=>{
        console.log(err);
      }
    ) 
  }

  guardarProyecto(){
    let nombre='';
    if(!this.nombreProyecto){
        this.nombreProyecto='Proyecto nuevo'
    }
    let proyecto ={
      html:this.code1,
      js:this.code2,
      css:this.code3,
      nombre:this.nombreProyecto,
      padre:this.idCarpetaProyecto,

    }

    this.carpetaService.agregarProyeto(this.idCarpetaProyecto, proyecto).subscribe(
      res=>{
            //console.log(res)
            this.mostrarTabla=true;
     
      }, 
      err=>{
        console.log(err);
      }
    )


    
  }

  agregarProyecto(){

    let datos = {
      html:'',
      js:'',
      css:'',
      nombre:this.nombreCarpeta,
      padre:this.padre
    }

    //console.log(datos);
    this.carpetaService.agregarProyeto(this.idCarpeta,datos).subscribe(
        res=>{
         // console.log(res);
         this.obtenerSubCarpetas(this.idCarpeta);
         this.modalService.dismissAll();
         this.nombreCarpeta='';
        
        },
        err=>{
          console.log(err);
        }
    )
    
    

  }

  abrirProyecto(idproyecto, padre){
    this.carpetaService.abrirProyecto(idproyecto,padre).subscribe(
      res=>{
           // console.log(res)
            this.code1=res.html;
            this.code2=res.js;
            this.code3=res.css;
            this.idCarpetaProyecto=res.padre;
            this.idProyecto=res._id
            this.mostrarTabla=false;
      }, 
      err=>{
        console.log(err);
      }
    )
  }

  eliminarProyecto(proyectoId,padre){
      this.carpetaService.eliminarProyecto(proyectoId, padre).subscribe(
        res=>{
            this.obtenerSubCarpetas(padre);
        }
      ),
      err=>{
        console.log(err);
      }
  }

  GuardarHtml(){
    //you can enter your own file name and extension
    this.escribirArchivo(this.code1, 'Sample File html'+'.html', 'text/html');
  }
  

//----------------------------------------guardar JS
  GuardarJs(){
    //you can enter your own file name and extension
    this.escribirArchivo(this.code2, 'Sample File js'+'.js', 'text/html');
  }

  //-------------------------guardar Css
  GuardarCss(){
    //you can enter your own file name and extension
    this.escribirArchivo(this.code3, 'Sample File css'+'.css', 'text/html');
  }

  escribirArchivo(contenido, nombreArchivo, contentType) {
    var a = document.createElement('a');
    var file = new Blob([contenido], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = nombreArchivo;
    a.click();
  }
  


}



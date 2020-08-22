import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarpetaService {
  private URL=" http://localhost:8888/folder"
  constructor(
    private httpClient:HttpClient,
  ) { }


obtenerCarpetas():Observable<any>{
 return this.httpClient.get(this.URL+'/carpetas/usuario');
}

nuevaCarpeta(nombreCarpeta):Observable<any>{
  return this.httpClient.post(this.URL+'/nuevaCarpeta/raiz',nombreCarpeta);
}

nuevaCapetaHija(idPadre, nombreCarpeta):Observable<any>{
  console.log(nombreCarpeta)
  return this.httpClient.post(this.URL+`/nueva/subCarpeta/${idPadre}`,{nombre:nombreCarpeta})
}

obtenerSubCarpetas(idPadre):Observable<any>{
return this.httpClient.get(this.URL+`/subCarpetas/${idPadre}`)
}

cambiarNombre(nombreCarpeta,idCarpeta):Observable<any>{
  console.log(nombreCarpeta)
 return this.httpClient.post(this.URL+`/carpeta/cambiarNombre/${idCarpeta}`,{nombre:nombreCarpeta})
}

eliminarCarpetaRaiz(idPadre):Observable<any>{
  return this.httpClient.delete(this.URL+`/elimnarCarpeta/${idPadre}/raiz/0`)
}

eliminarCarpetahija(idCarpeta, idCarpetaPadre):Observable<any>{
  return this.httpClient.delete(this.URL+`/eleminarCarpeta/${idCarpeta}/${idCarpetaPadre}`)
}

}

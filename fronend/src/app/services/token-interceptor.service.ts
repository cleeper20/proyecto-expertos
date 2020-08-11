import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) { }

    intercept(req, next){
      const tokenizeReq = req.clone({//req obitene la informacion de cada peticion y le añade una cabecera 
        setHeaders:{Authorization:`Beares ${this.authService.getToken()} `}//si el token tiene este formato el servidor devulve una respuesta
      })

      return next.handle(tokenizeReq);
      
    }


}

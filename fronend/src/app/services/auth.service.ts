import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL=" http://localhost:8888/user"

  constructor(
    private http: HttpClient,
    private router:Router,
  ) { }

  SingUp(user){
    return this.http.post<any>(this.URL+'/singup', user);
  }
}

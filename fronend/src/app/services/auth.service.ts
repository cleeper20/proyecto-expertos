import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private id;

  private URL=" http://localhost:8888/user"

  constructor(
    private http: HttpClient,
    private router:Router,
  ) { }

  SingUp(user){
    this.http.post<any>(this.URL+'/singup', user).subscribe(
      res=>{
        this.id=res.idUser;
      }
    )

    return this.http.post<any>(this.URL+'/singup', user);
  }

  SingIn(user){

    this.http.post<any>(this.URL+'/singin', user).subscribe(
      res=>{
        this.id=res.idUser;
        console.log(this.id);

      }
    )

    return this.http.post<any>(this.URL+'/singin', user);
  }

  getData(){
   return this.http.get<any>(this.URL+'/'+this.id)
  }

  loggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}

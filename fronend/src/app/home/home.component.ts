import { Component, OnInit } from '@angular/core';


import {FormGroup,FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
mensaje='';
showAlert=false;
  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  formularioLogin = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
  });

get email(){
  return this.formularioLogin.get('email')
}

get password(){
  return this.formularioLogin.get('password')
}

  singIn(){

    if(this.formularioLogin.valid == false){
      this.mensaje="Debe llenar todos los campos";
      this.showAlert=true;
      return;
    }

    this.authService.SingIn(this.formularioLogin.value).subscribe(

      res=>{
        console.log(res,'res');
        localStorage.setItem('token', res.token);
        this.router.navigate(['/workShop']);
      },

      error=>{
        console.log(error);//inautorizado
        this.showAlert=true;
        this.mensaje="Credenciales invalidas"
      })



  }

}

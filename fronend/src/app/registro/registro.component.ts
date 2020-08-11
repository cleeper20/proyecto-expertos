import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormControlName } from '@angular/forms'



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formularioRegistro = new FormGroup({
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
    password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', [Validators.required]),
    tipoCuenta: new FormControl(),

  });

  formularioRegistroTarjeta = new FormGroup({
    titular: new FormControl('', [Validators.required]),
    numeroTarjeta: new FormControl('', [Validators.required, Validators.pattern(/[0-9]/)]),
    mes: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.pattern(/[0-9]/)]),
    anio: new FormControl('', [Validators.required, Validators.maxLength(2),Validators.pattern(/[0-9]/)]),
    codigoCVV: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.pattern(/[0-9]/)]),
  });

  show = true;
  free = false;
  pro = false;
  alertForm = false;
  mensaje = '';

  /*user={
    nombres:'',
    apellidos:'',
    email:'',
    titular:'',
    numeroTarjeta:'',
    fechaExpiracion:{mes:'',anio:''},
    codigoCVV:'',
    password:'',
    passwordConfirm:'',
    tipoCuenta:'',
  
  
  };*/



  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  get nombres() {//el get me permite escribir en nombre de la funcion sin los parentesis 
    return this.formularioRegistro.get('nombres');
  }

  get apellidos() {//el get me permite escribir en nombre de la funcion sin los parentesis 
    return this.formularioRegistro.get('apellidos');
  }

  get email() {//el get me permite escribir en nombre de la funcion sin los parentesis 
    return this.formularioRegistro.get('email');
  }

  get password() {//el get me permite escribir en nombre de la funcion sin los parentesis 
    return this.formularioRegistro.get('password');
  }

  get passwordConfirm() {//el get me permite escribir en nombre de la funcion sin los parentesis 
    return this.formularioRegistro.get('passwordConfirm');
  }

  get titular() {//el get me permite escribir en nombre de la funcion sin los parentesis 
    return this.formularioRegistroTarjeta.get('titular');
  }

  get numeroTarjeta() {//el get me permite escribir en nombre de la funcion sin los parentesis 
    return this.formularioRegistroTarjeta.get('numeroTarjeta');

  }

  get mes() {//el get me permite escribir en nombre de la funcion sin los parentesis 
    return this.formularioRegistroTarjeta.get('mes');

  }

  get anio() {//el get me permite escribir en nombre de la funcion sin los parentesis 
    return this.formularioRegistroTarjeta.get('anio');

  }

  get codigoCVV() {//el get me permite escribir en nombre de la funcion sin los parentesis 
    return this.formularioRegistroTarjeta.get('codigoCVV');

  }




  showPro() {
    this.pro = true;
    this.show = false;
    this.free = false;

  }

  showFree() {
    this.pro = false;
    this.show = false;
    this.free = true;
  }

  singUp(i) {


    if (i == 0) {

                if (this.formularioRegistro.valid == false) {
                  this.mensaje = "Debe llenar todos los campos"
                  this.alertForm = true;
                  
                  return;
                }

                if (this.formularioRegistro.value.password != this.formularioRegistro.value.passwordConfirm) {
                  this.mensaje = "Las contraseñas no coinciden, intente de nuevo"
                  this.alertForm = true;
                 
                  return;
                }

                let usuario = {
                  nombres: this.formularioRegistro.value.nombres,
                  apellidos: this.formularioRegistro.value.apellidos,
                  email: this.formularioRegistro.value.email,
                  titular: '',
                  numeroTarjeta: '',
                  fechaExpiracion: { mes: '', anio: '' },
                  codigoCVV: '',
                  password: this.formularioRegistro.value.password,
                  tipoCuenta: 'free',

                }

                this.authService.SingUp(usuario).subscribe(
                  res => {
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['/workShop'])
                  },

                  err => {
                    console.log(err)
                  })


    }

    if(i==1){

      if (this.formularioRegistro.valid == false || this.formularioRegistroTarjeta.valid == false ) {
        this.mensaje = "Debe llenar todos los campos"
        this.alertForm = true;        
        return;
      }

      if (this.formularioRegistro.value.password != this.formularioRegistro.value.passwordConfirm) {
        this.mensaje = "Las contraseñas no coinciden, intente de nuevo"
        this.alertForm = true;
       
        return;
      }

      let usuario={
        nombres:this.formularioRegistro.value.nombres,
        apellidos:this.formularioRegistro.value.apellidos,
        email:this.formularioRegistro.value.email,
        titular:this.formularioRegistroTarjeta.value.titular,
        numeroTarjeta:this.formularioRegistroTarjeta.value.numeroTarjeta,
        fechaExpiracion:{mes:this.formularioRegistroTarjeta.value.mes,anio:this.formularioRegistroTarjeta.value.anio},
        codigoCVV:this.formularioRegistroTarjeta.value.codigoCVV,
        password:this.formularioRegistro.value.password,       
        tipoCuenta:'pro',
      
      
      }

      this.authService.SingUp(usuario).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/workShop'])
        },

        err => {
          console.log(err)
        })


    }

  }

}

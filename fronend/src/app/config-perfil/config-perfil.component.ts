import { Component, OnInit } from '@angular/core';
import {AuthService } from '../services/auth.service';

import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router'



@Component({
  selector: 'app-config-perfil',
  templateUrl: './config-perfil.component.html',
  styleUrls: ['./config-perfil.component.css']
})
export class ConfigPerfilComponent implements OnInit {
mensaje='';
alertForm=false;
  user={
    nombre:'',
  }

  constructor(
    private authService : AuthService,
    private router: Router
  ) { }

  ngOnInit() {
   

    this.authService.getData().subscribe(res=>{
      this.formularioConfig.controls['nombres'].setValue(res.nombres);
      this.formularioConfig.controls['apellidos'].setValue(res.apellidos);
      this.formularioConfig.controls['email'].setValue(res.email);
      this.formularioConfig.controls['password'].setValue('');
      this.formularioConfig.controls['passwordConfirm'].setValue('');

      this.formularioTarjetaConfig.controls['titular'].setValue(res.titular);
      this.formularioTarjetaConfig.controls['numeroTarjeta'].setValue(res.numeroTarjeta);
      this.formularioTarjetaConfig.controls['anio'].setValue(res.fechaExpiracion.anio);
      this.formularioTarjetaConfig.controls['mes'].setValue(res.fechaExpiracion.mes);
      this.formularioTarjetaConfig.controls['codigoCVV'].setValue(res.codigoCVV);
    });
    
    //this.formularioConfig.controls['nombres'].setValue(data.nombres);
    
  }

  

  formularioConfig = new FormGroup({
    nombres: new FormControl('',[Validators.required]),
    apellidos: new FormControl('', [Validators.required ]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)]),
    password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', [Validators.required]),
  })

  formularioTarjetaConfig = new FormGroup({
    titular: new FormControl('', [Validators.required]),
    numeroTarjeta: new FormControl('', [Validators.required, Validators.pattern(/[0-9]/)]),
    anio: new FormControl('', [Validators.required, Validators.pattern(/[0-9]/)]),
    mes: new FormControl('', [Validators.required, Validators.pattern(/[0-9]/)]),
    codigoCVV: new FormControl('', [Validators.required, Validators.pattern(/[0-9]/)]), 

  })

  logaut(){
    this.authService.logout();
  }

  updated(i) {


    if (i == 0) {

                if (this.formularioConfig.valid == false) {
                  this.mensaje = "Debe llenar todos los campos"
                  this.alertForm = true;
                  
                  return;
                }

                if (this.formularioConfig.value.password != this.formularioConfig.value.passwordConfirm) {
                  this.mensaje = "Las contraseñas no coinciden, intente de nuevo"
                  this.alertForm = true;
                 
                  return;
                }

                let usuario = {
                  nombres: this.formularioConfig.value.nombres,
                  apellidos: this.formularioConfig.value.apellidos,
                  email: this.formularioConfig.value.email,
                  titular: '',
                  numeroTarjeta: '',
                  fechaExpiracion: { mes: '', anio: '' },
                  codigoCVV: '',
                  password: this.formularioConfig.value.password,
                  tipoCuenta: 'free',

                }

                this.authService.actualizar(usuario).subscribe(
                  res => {
                   // localStorage.setItem('token', res.token);
                    //this.router.navigate(['/workShop'])
                    console.log(res)
                  },

                  err => {
                    console.log(err)
                  })


    }

    if(i==1){

      if (this.formularioConfig.valid == false || this.formularioTarjetaConfig.valid == false ) {
        this.mensaje = "Debe llenar todos los campos"
        this.alertForm = true;        
        return;
      }

      if (this.formularioConfig.value.password != this.formularioConfig.value.passwordConfirm) {
        this.mensaje = "Las contraseñas no coinciden, intente de nuevo"
        this.alertForm = true;
       
        return;
      }

      let usuario={
        nombres:this.formularioConfig.value.nombres,
        apellidos:this.formularioConfig.value.apellidos,
        email:this.formularioConfig.value.email,
        titular:this.formularioTarjetaConfig.value.titular,
        numeroTarjeta:this.formularioTarjetaConfig.value.numeroTarjeta,
        fechaExpiracion:{mes:this.formularioTarjetaConfig.value.mes,anio:this.formularioTarjetaConfig.value.anio},
        codigoCVV:this.formularioTarjetaConfig.value.codigoCVV,
        password:this.formularioConfig.value.password,       
        tipoCuenta:'pro',
      
      
      }

      this.authService.actualizar(usuario).subscribe(
        res => {
         // localStorage.setItem('token', res.token);
         // this.router.navigate(['/workShop'])
         console.log(res)
        },

        err => {
          console.log(err)
        })


    }

  }





}

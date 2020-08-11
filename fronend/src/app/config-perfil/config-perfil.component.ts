import { Component, OnInit } from '@angular/core';
import {AuthService } from '../services/auth.service';

import {FormGroup, FormControl, Validators} from '@angular/forms'


@Component({
  selector: 'app-config-perfil',
  templateUrl: './config-perfil.component.html',
  styleUrls: ['./config-perfil.component.css']
})
export class ConfigPerfilComponent implements OnInit {

  user={
    nombre:'',
  }

  constructor(
    private authService : AuthService,
  ) { }

  ngOnInit() {
   

    this.authService.getData().subscribe(res=>{
      console.log(res)
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

  update(){
    /*this.user.nombre="Benito Camela"
     console.log(this.user.nombre)*/
 
     
  }

}

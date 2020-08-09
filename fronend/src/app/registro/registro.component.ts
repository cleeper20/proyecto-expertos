import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
user={};
show=true;
free=false;
pro=false;
  constructor(
    private authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  showPro(){
    this.pro=true;
    this.show=false;
    this.free=false;

  }

  showFree(){
    this.pro=false;
    this.show=false;
    this.free=true;
  }

  singUp(){

  }

}

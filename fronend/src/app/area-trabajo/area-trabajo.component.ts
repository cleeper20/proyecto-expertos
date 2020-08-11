import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'



@Component({
  selector: 'app-area-trabajo',
  templateUrl: './area-trabajo.component.html',
  styleUrls: ['./area-trabajo.component.css'],
})


export class AreaTrabajoComponent implements OnInit {

  constructor(
    private authSerive: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
      this.authSerive.logout();
  }

}

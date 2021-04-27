import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/auth/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private userService: AuthenticateService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logOut();
    this.router.navigate([""]);
  }
}

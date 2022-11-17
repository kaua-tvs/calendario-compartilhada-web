import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  routers = [
      {id:'add_member', router: '/members/adicionar'},
      {id: 'home', router: '/'}
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(router: string) {
    const navigateTo = this.routers.find(f => f.id == router)?.router;
    this.router.navigate([navigateTo])
  }
}

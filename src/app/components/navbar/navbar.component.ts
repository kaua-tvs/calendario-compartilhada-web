import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/inteceptors/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  routers = [
    { id: 'add_member', router: '/members/adicionar' },
    { id: 'home', router: '/home' },
  ];

  usserLogged: Observable<boolean>;

  constructor(private router: Router, private authService: AuthService) {
    this.usserLogged = this.authService.isLoggedIn;
  }

  ngOnInit(): void {}

  navigateTo(router: string) {
    const navigateTo = this.routers.find((f) => f.id == router)?.router;
    this.router.navigate([navigateTo]);
  }
}

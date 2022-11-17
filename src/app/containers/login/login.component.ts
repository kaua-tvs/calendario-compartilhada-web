import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/inteceptors/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  userForms: FormGroup<any>;

  constructor(private fb: FormBuilder, private router: Router, 
    private authService: AuthService) { 

    this.userForms = this.fb.group({
      email: ['', Validators.required],
      code: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }

  submit(){
    if(this.userForms.valid){
      this.router.navigate(['/home']);
      localStorage.setItem('userLogged', this.userForms.controls['email'].value);
      this.authService.login({email: this.userForms.controls['email'].value, code: this.userForms.controls['code'].value});
    }
  }

}

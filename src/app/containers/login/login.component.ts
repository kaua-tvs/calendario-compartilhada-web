import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  userForms: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { 

    this.userForms = this.fb.group({
      email: ['', Validators.required],
      code: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }

  submit(){
    if(this.userForms.valid){
      this.router.navigate(['/home'])
    }
  }

}

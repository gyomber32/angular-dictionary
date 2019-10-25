import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public hide = true;
  public isLoading = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  /*getErrorMessage() {
    return this.loginForm.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }*/

  login() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.isLoading = true;
    this.authService.login(email, password).subscribe(result => {
      localStorage.setItem('token', result.token);
      const tokenExpiry = (new Date().getTime() + 3600000).toString();
      localStorage.setItem('tokenExpiry', tokenExpiry);
      this.router.navigate(['/']);
      this.isLoading = false;
      this.authService.autoLogout(+tokenExpiry);
    }, (error) => {
      console.log(error);
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.authService.autoLogin();
    document.body.classList.add('bg-img');
    this.loginForm = this.formBuilder.group({
      email: ['', {
        validators: Validators.compose([
          Validators.required,
          Validators.email])
      }],
      password: ['', { validators: [Validators.required, Validators.minLength(8)] }]
    });
  }

}

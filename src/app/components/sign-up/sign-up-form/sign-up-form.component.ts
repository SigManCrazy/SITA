import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'app/shared/service/signup.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  formGroup: FormGroup;
  errorMessage: string;
  hide: boolean;

  constructor(private signupService: SignupService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  checkPassword(): boolean {
    let a = this.formGroup.get('password'),
      b = this.formGroup.get('confirmPassword');
    return a?.value === b?.value;
  }

  signup(): void {
    if (this.formGroup.valid && this.checkPassword()) {
      let payload = this.formGroup.value;
      delete payload.confirmPassword;
      payload.role = 'guest';
      this.signupService.signup(this.formGroup.value).subscribe(
        (res) => {
          this.errorMessage = '';
          localStorage.setItem('User', JSON.stringify(res));
          this.router.navigateByUrl('/app/dashboard');
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.errorMessage = 'errore';
    }
  }

}

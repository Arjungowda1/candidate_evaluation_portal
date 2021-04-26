import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/service/auth/authenticate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/user';
import { Router } from '@angular/router';
import { Role } from '../shared/role';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {


  inputData: User;
  errMess: string;

  response: User;

  cepLoginForm: FormGroup;

  formErrors = {
    'email' : '',
    'password': ''
  }

  validationMessages = {
    'email' : {
      'required' : 'E-mail ID is required.',
      'pattern' : 'Enter a valid email' 
    },
    'password' : {
      'required' : 'Password is required.'
    }
  }

  constructor(private loginService: AuthenticateService,
    public fb:FormBuilder,
    public route:Router) {

      this.createLoginForm();
      this.inputData = new User;

     }

  createLoginForm() {
    this.cepLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$") ] ],
      password: ['', Validators.required]
    });

    this.cepLoginForm.valueChanges.subscribe( data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?:any){
    if (!this.cepLoginForm) { return; }
    const form = this.cepLoginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  ngOnInit(): void {

  }

  onSubmit(){
    if(this.cepLoginForm.value){
      this.inputData.email = this.cepLoginForm.value.email;
      this.inputData.password = this.cepLoginForm.value.password;
      this.loginService.login(this.inputData)
      .subscribe(res => {
        this.response = res;

        let role = this.response.roles[0];
        if(role == Role.ADMIN){
          this.route.navigate(['/admin'])
        }
        else{
          this.route.navigate(['/interviewer',this.response.userId]);
        }
      },
      err => {
        this.errMess = "Invalid Credentials or User doesn't exist";
        this.cepLoginForm.reset();
      })
    }
  } 

}

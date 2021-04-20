import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/service/auth/authenticate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/shared/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  inputData: Login;
  errMess: string;

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
      this.inputData = new Login;

     }

  createLoginForm() {
    this.cepLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ] ],
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
      this.inputData.firstname = "admin";
      this.inputData.lastname = "admin";

      this.loginService.verifyUser(this.inputData)
      .subscribe(res => {
        if(res == 0){
          this.errMess = "Invalid Credentials or User doesn't exist";
          this.cepLoginForm.reset();
        }

        else{
          if(res==1){
            this.route.navigate(['/admin'])
          }
          else{
            this.route.navigate(['/interviewer',res])
          }
        }
      })
    }
  } 

}

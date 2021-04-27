import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/service/auth/authenticate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/user';
import { Router } from '@angular/router';
import { Role } from '../shared/role';
import { PasswordService } from '../service/password.service';
import { NotificationService } from '../notifier/notifier.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {


  keyReceived = true;
  result = "";
  responsePassword = "";
  key = "";
  Mess = "";
  errMessEmail = "";
  errEmail = true;

  newPasswordUser: User = new User();

  resetEmail = "";

  validKey= true;
  errKey = true;
  errKeyMesg = "";

  inputData: User;
  errMess: string;

  response: User;

  resetPasswordForm: FormGroup;

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
    public route:Router,
    private passwordService: PasswordService,
    private _notificationservice:NotificationService,) {

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
          this.route.navigate(['/interviewer',this.response.id]);
        }
      },
      err => {
        this.errMess = "Invalid Credentials or User doesn't exist";
        this.cepLoginForm.reset();
      })
    }
  } 

  sendKey(email: string){
    this.resetEmail = email;
    this.passwordService.getKey(email)
    .subscribe( res=>{
      this.result = <any>res;
      if(this.result === "Invalid Email! User doesn't exist"){
        this.errEmail = false;
        this.errMessEmail = this.result;
      }
      else{
        this.responsePassword = "Sent! Please check your email for a key";
        this.keyReceived = false;
        this.errEmail = true;
        this.key = this.result;
      }
    })
  }

  verifyKey(input: string){
    if(input === this.key){
      this.Mess = "Verified! Please enter your new password";
      this.validKey = false;
      this.errKey = true;
    }
    else{
      this.errKey = false;
      this.errKeyMesg = "Invalid Key! Please try again";
    }
  }


  resetPassword(newPassword:string){
    console.log(this.resetEmail);
    this.newPasswordUser.email = this.resetEmail;
    this.newPasswordUser.password = newPassword;
    this.passwordService.resetPassword(this.newPasswordUser)
      .subscribe(
        res =>{
          this._notificationservice.success("Successfully reset the password");
          setTimeout(()=>window.location.reload(),1000);
        }
      )
  }
}

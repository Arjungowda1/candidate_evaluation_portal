import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/service/auth/authenticate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/user';
import { Router } from '@angular/router';
import { Role } from '../shared/role';
import { PasswordService } from '../service/password.service';
import { NotificationService } from '../notifier/notifier.service';
import { InterviewerService } from '../service/interviewer/interviewer.service';
import { SignUpApproval } from '../shared/login';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  hidePass = true;

  keyReceived = true;
  result = "";
  responsePassword = "";
  key = "";
  Mess = "";
  errMessEmail = "";
  errEmail = true;

  signUpUser:SignUpApproval;

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


  cepSignUpForm: FormGroup;

  constructor(private loginService: AuthenticateService,
    public fb:FormBuilder,
    public route:Router,
    private passwordService: PasswordService,
    private _notificationservice:NotificationService,
    ) {

      this.createLoginForm();
      this.createSignUpForm();
      this.inputData = new User;
      this.signUpUser = new SignUpApproval;

     }
  createSignUpForm() {
    this.cepSignUpForm = this.fb.group({
      signupFirstName:['',[Validators.required]],
      signupLastName:['',[Validators.required]],
      signupEmail:['',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$") ] ],
      signupPassword: ['', Validators.required]
    });
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


SignupUser(){

  if(this.cepSignUpForm.value){
    this.signUpUser.firstName = this.cepSignUpForm.value.signupFirstName;
    this.signUpUser.lastName = this.cepSignUpForm.value.signupLastName;
    this.signUpUser.email = this.cepSignUpForm.value.signupEmail;
    this.signUpUser.password = this.cepSignUpForm.value.signupPassword;

    this.passwordService.checkUserExist(this.signUpUser.email)
    .subscribe(
      res =>{
        console.log(res);
        if(res){
          this.passwordService.checkEmail(this.signUpUser.email)
          .subscribe( resp =>{
            if(resp){
              console.log(res);
              this._notificationservice.error("User Exists! Please Log in");
              this.cepSignUpForm.reset();
            }
            else{
              this._notificationservice.error("Your request is yet to be reviewed by admin");
              this.cepSignUpForm.reset();
            }
          });
        }
        else{
          this.passwordService.createInterviewer(this.signUpUser)
                .subscribe(
                  res => {
                  this._notificationservice.info("Your sign up request has been sent to admin! you will be mailed when signup is approved");
                this.cepSignUpForm.reset();
      }
    );
        }
      }
    )
  }
  
}



}

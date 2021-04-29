import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotificationService } from '../notifier/notifier.service';
import { AuthenticateService } from '../service/auth/authenticate.service';
import { InterviewerService } from '../service/interviewer/interviewer.service';
import { PasswordService } from '../service/password.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-interviewer-header',
  templateUrl: './interviewer-header.component.html',
  styleUrls: ['./interviewer-header.component.css']
})
export class InterviewerHeaderComponent implements OnInit {

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

  userId: number;
  data: User;
  currentUser: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private interviewerService: InterviewerService,
    private userService: AuthenticateService,
    private passwordService: PasswordService,
    private _notificationservice:NotificationService,
  ) { 
    this.data = new User();
  }


  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


    this.interviewerService.getInterviewers(this.currentUser.id)
    .subscribe(
      res =>{
        this.data =<any>res;
        
      }
    )

  }

  logout(){
    this.userService.logOut();
    this.router.navigate([""]);
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

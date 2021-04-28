import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/user';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../service/admin/admin.service';
import { AuthenticateService } from '../service/auth/authenticate.service';
import { NotificationService } from '../notifier/notifier.service';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { PasswordService } from '../service/password.service';
import { SignUpApproval } from '../shared/login';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  @ViewChild(DialogsComponent) dialogComponent;

  pendingUserDisp = false;
  newUser: User;
  sucessMess: String;
  uid: number;

  delete = false;

  userexists= true;

  allUsers:User[];

  title = "Alert!";
  message = "Are you sure you want to delete?";

  pendingUsers: SignUpApproval[];

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private adminService: AdminService,
    private loginService: AuthenticateService,
    private _notificationservice:NotificationService,
    private userService:PasswordService
  ) {
    this.newUser = new User();
    this.pendingUsers = [];
   }

  ngOnInit(): void {

    this.pendingUsersDb();
    this.allUserDisplay();
  }

  pendingUsersDb(){
    this.userService.requestSignupUsers()
    .subscribe(
      res =>{
        this.pendingUsers = <any>res;
        if(this.pendingUsers.length == 0){
          this.pendingUserDisp = false;
        }
        else{
          this.pendingUserDisp = true;
        }
      }
    );
  }


  allUserDisplay(){
    this.adminService.extractAllUsers()
    .subscribe( res =>{
      this.allUsers = <any>res;
      if(this.allUsers.length == 0){
        this.userexists = false;
      }
      else{
        this.userexists = true;
      }
    })
  }

  ngAfterViewInit(): void {
    this.dialogComponent.getSelectedOption().subscribe((value: boolean) => {
     this.delete = value;
     if(this.delete){
      this.adminService.deleteUser(this.uid)
      .subscribe(res => {
        if(res != null){
          this.allUserDisplay();
          this.delete = false;
        }
      });
      this._notificationservice.info("User deleted successfully")
    }
    });
  }

  deleteuser(event, data){
    this.uid = data.userId;
    if(data.roles[0].name === "ROLE_ADMIN"){

      this._notificationservice.error("Cannot delete Administrator!");
    }
    else{
      this.dialogComponent.openDialog(
        "Are you sure to remove the content?"
      );
    }
  }

  openSnackBar(data: string) {
    this._notificationservice.success(data);
  }


  approve(event:any, user){
   console.log(user);
   this.newUser.firstName = user.firstName;
   this.newUser.lastName = user.lastName;
   this.newUser.email = user.email;
   this.newUser.password = user.password;
   this.newUser.id = user.userId;

   this.loginService.register(this.newUser)
   .subscribe( res => {
      this.openSnackBar("User Approved");
      this.allUserDisplay();
      this.userService.rejectUsers(this.newUser.id)
      .subscribe( res =>{
        this.pendingUsersDb();
      })
   })
  }

  reject(event:any, user){
    this.userService.rejectUsers(user.userId)
    .subscribe( res =>{
      this._notificationservice.info("User Rejected");
      this.pendingUsersDb();
    })
  }
}

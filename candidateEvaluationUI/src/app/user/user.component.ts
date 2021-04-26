import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/user';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../service/admin/admin.service';
import { AuthenticateService } from '../service/auth/authenticate.service';
import { NotificationService } from '../notifier/notifier.service';
import { DialogsComponent } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  @ViewChild(DialogsComponent) dialogComponent;

  newUser: User;
  sucessMess: String;
  uid: number;

  delete = false;

  userexists= true;

  allUsers:User[];

  title = "Alert!";
  message = "Are you sure you want to delete?";


  cepSignupUser: FormGroup;

  formErrors = {
    'firstname': '',
    'lastname':''
  }

  validationMessages = {
    'firstname':{
      'required': 'First Name is required',
      'minlength': 'First Name must me atleast 1 characters'
    },
    'lastname':{
      'required': 'Last Name is required',
      'minlength': 'Last Name must me atleast 1 characters'
    }
  }

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private adminService: AdminService,
    private loginService: AuthenticateService,
    private _notificationservice:NotificationService,
  ) {

    this.createInterviewer();
    this.newUser = new User();

   }


  createInterviewer() {
    this.cepSignupUser = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(1)]],
      lastname: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.cepSignupUser.valueChanges.subscribe( data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?:any){
    if (!this.cepSignupUser) { return; }
    const form = this.cepSignupUser;
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
    this.allUserDisplay();
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

  Signup(){
    if(this.cepSignupUser.value){
      this.newUser.firstName = this.cepSignupUser.value.firstname;
      this.newUser.lastName = this.cepSignupUser.value.lastname;
      this.newUser.email = this.cepSignupUser.value.firstname + this.cepSignupUser.value.lastname +"@clarivate.com";
      this.newUser.password = this.cepSignupUser.value.firstname + "123";
      
      this.loginService.register(this.newUser)
      .subscribe( res => {
          this.openSnackBar("User created successfully");
          this.cepSignupUser.reset();
          this.allUserDisplay();
      })
    }
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
}

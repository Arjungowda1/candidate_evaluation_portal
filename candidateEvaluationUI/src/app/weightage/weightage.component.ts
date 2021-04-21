import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../service/admin/admin.service';
import { Weightage } from '../shared/weightage';
import { NotifierComponent } from '../notifier/notifier.component';
import { NotificationService } from '../notifier/notifier.service';
import { DialogsComponent } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-weightage',
  templateUrl: './weightage.component.html',
  styleUrls: ['./weightage.component.css']
})
export class WeightageComponent implements OnInit , AfterViewInit {

  @ViewChild(DialogsComponent) dialogComponent;
  
  newWeightage: Weightage;
  confirmWeightage: Weightage;
  durationInSeconds = 5;

  delete = false;
  weightageId: number;

  sucessMesg: String;
  exists = true;
  btndisplay = true;

  existingWeightage: Weightage[];

  cepWeightageForm: FormGroup;

  formErrors = {
    'education': '',
    'programming': '',
    'adaptibility': '',
    'problem': '',
    'logical': '',
    'interpersonal': '',
    'cutoff': ''
  }

  validationMessages = {
    'education':{
      'required': 'This field is required',
      'max': 'Enter value less than 100'
    },
    'programming': {
      'required': 'This field is required',
      'max': 'Enter value less than 100'
    },
    'adaptibility': {
      'required': 'This field is required',
      'max': 'Enter value less than 100'
    },
    'problem': {
      'required': 'This field is required',
      'max': 'Enter value less than 100'
    },
    'logical': {
      'required': 'This field is required',
      'max': 'Enter value less than 100'
    },
    'interpersonal': {
      'required': 'This field is required',
      'max': 'Enter value less than 100'
    },
    'cutoff': {
      'required': 'This field is required'
    }
  }

  constructor(
    public fb: FormBuilder,
    private adminService: AdminService,
    private _notificationservice:NotificationService
  ) { 
    this.createWeightage();
    this.newWeightage = new Weightage();
    this.confirmWeightage = new Weightage();
  }


  ngAfterViewInit(): void {
    this.dialogComponent.getSelectedOption().subscribe((value: boolean) =>{
      this.delete = value;
      if(this.delete){
        this.adminService.deleteWeightage(this.weightageId)
        .subscribe(
          res => {console.log(res);
          this.allWeightageDisplay();
          this.btndisplay = true;
          this.delete = false;}
        );
        this._notificationservice.info("Weightage removed successfully")
      }
    });
    
  }

  createWeightage() {
    this.cepWeightageForm = this.fb.group({
      education: ['', [Validators.required, Validators.max(100)]],
      programming: ['', [Validators.required, Validators.max(100)]],
      adaptibility: ['', [Validators.required, Validators.max(100)]],
      problem: ['', [Validators.required, Validators.max(100)]],
      logical: ['', [Validators.required, Validators.max(100)]],
      interpersonal: ['', [Validators.required, Validators.max(100)]],
      cutoff: ['', [Validators.required]],

    });

    this.cepWeightageForm.valueChanges.subscribe( data => this.onValueChanged(data));
    this.onValueChanged();
  }
  
  
  onValueChanged(data?:any){
    if (!this.cepWeightageForm) { return; }
    const form = this.cepWeightageForm;
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

  createWeight(){
    if(this.cepWeightageForm.value){
      this.newWeightage.education_weightage = this.cepWeightageForm.value.education;
      this.newWeightage.programming_weightage = this.cepWeightageForm.value.programming;
      this.newWeightage.adaptibility_weightage = this.cepWeightageForm.value.adaptibility;
      this.newWeightage.problem_weightage = this.cepWeightageForm.value.problem;
      this.newWeightage.logical_weightage = this.cepWeightageForm.value.logical;
      this.newWeightage.interpersonal_weightage = this.cepWeightageForm.value.interpersonal;
      this.newWeightage.cutoff = this.cepWeightageForm.value.cutoff;

      this.adminService.createWeightage(this.newWeightage)
      .subscribe( res =>{
        if(res == true){
          this.cepWeightageForm.reset();
          this.allWeightageDisplay();
          this.openSnackBar('Weightage created Successfully');
          this.btndisplay = false;
        }
      })
    }
  }
  
  ngOnInit(): void {
    this.allWeightageDisplay();
  }
  allWeightageDisplay() {
    this.adminService.getWeightage()
    .subscribe(
      res => {
        this.existingWeightage = <any> res;
        if(this.existingWeightage.length == 0){
          this.exists = false;
        }
        else{
          this.exists = true;
          this.btndisplay = false
        }
     }
    );
  }


  deleteWeightage(event, item){
    this.weightageId = item.weightage_id;
    this.dialogComponent.openDialog(
      "Are you sure to remove the content?"
    );
  }

  modalData(){
    this.confirmWeightage.education_weightage = this.cepWeightageForm.value.education/5;
    this.confirmWeightage.programming_weightage = this.cepWeightageForm.value.programming/5;
    this.confirmWeightage.adaptibility_weightage = this.cepWeightageForm.value.adaptibility/5;
    this.confirmWeightage.problem_weightage = this.cepWeightageForm.value.problem/5;
    this.confirmWeightage.logical_weightage = this.cepWeightageForm.value.logical/5;
    this.confirmWeightage.interpersonal_weightage = this.cepWeightageForm.value.interpersonal/5;
    this.confirmWeightage.cutoff = this.cepWeightageForm.value.cutoff;
    
  }

  closeClick(){
    this.cepWeightageForm.reset();
  }


  openSnackBar(data: string) {
    this._notificationservice.success(data);
  }

}

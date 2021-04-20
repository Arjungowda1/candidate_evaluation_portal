import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../service/admin/admin.service';
import { Weightage } from '../shared/weightage';

@Component({
  selector: 'app-weightage',
  templateUrl: './weightage.component.html',
  styleUrls: ['./weightage.component.css']
})
export class WeightageComponent implements OnInit {

  newWeightage: Weightage;
  sucessMesg: String;
  exists = true;

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
    private adminService: AdminService
  ) { 
    this.createWeightage();
    this.newWeightage = new Weightage();
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
          this.sucessMesg = "New weightage created sucessfully";
          this.cepWeightageForm.reset();
          this.allWeightageDisplay()
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
        }
      console.log(res);}
    );
  }

}

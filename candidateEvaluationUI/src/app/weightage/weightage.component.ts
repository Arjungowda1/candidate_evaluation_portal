import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { AdminService } from '../service/admin/admin.service';
import { NotifierComponent } from '../notifier/notifier.component';
import { NotificationService } from '../notifier/notifier.service';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { EvaluationFactors, Weightages } from '../shared/evaluationFactors';

@Component({
  selector: 'app-weightage',
  templateUrl: './weightage.component.html',
  styleUrls: ['./weightage.component.css']
})
export class WeightageComponent implements OnInit , AfterViewInit {

  @ViewChild(DialogsComponent) dialogComponent;

  _confirmWeightage: Weightages[] =EvaluationFactors;
  existingWeightage: Weightages[];
  
  factors: Weightages[] = EvaluationFactors;

  delete = false;

  sucessMesg: String;
  exists = true;
  btndisplay = true;

  weightageDate: string;
  cepWeightageForm: FormGroup;


  constructor(
    public fb: FormBuilder,
    private adminService: AdminService,
    private _notificationservice:NotificationService
  ) { 
    this.createWeightage();
    this.existingWeightage = [];
    this._confirmWeightage = new Array;
  }


  ngAfterViewInit(): void {
    this.dialogComponent.getSelectedOption().subscribe((value: boolean) =>{
      this.delete = value;
      if(this.delete){
        this.adminService.deleteWeightage()
        .subscribe(
          res => {
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
      education: ['', [Validators.required, Validators.max(100), Validators.pattern('0*[1-9][0-9]*')]],
      programming: ['', [Validators.required, Validators.max(100), Validators.pattern('0*[1-9][0-9]*')]],
      adaptibility: ['', [Validators.required, Validators.max(100), Validators.pattern('0*[1-9][0-9]*')]],
      problem: ['', [Validators.required, Validators.max(100), Validators.pattern('0*[1-9][0-9]*')]],
      logical: ['', [Validators.required, Validators.max(100), Validators.pattern('0*[1-9][0-9]*')]],
      interpersonal: ['', [Validators.required, Validators.max(100), Validators.pattern('0*[1-9][0-9]*')]],
      cutoff: ['', [Validators.required, Validators.min(100)]],
      criteria: this.fb.array([]),
    });
  }


  createWeight(){
    
    if(this.cepWeightageForm.value){
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Education")].weightage = this.cepWeightageForm.value.education ;
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Programming Skills")].weightage = this.cepWeightageForm.value.programming ;
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Adaptibility")].weightage = this.cepWeightageForm.value.adaptibility ;
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Problem Solving")].weightage = this.cepWeightageForm.value.problem ;
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Logical Skills")].weightage = this.cepWeightageForm.value.logical ;
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Interpersonal Skills")].weightage = this.cepWeightageForm.value.interpersonal ;
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Cut off Marks")].weightage = this.cepWeightageForm.value.cutoff ;
        
      this.adminService.createWeightage(this.factors)
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
    this.createWeightage();
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
          this.weightageDate = this.existingWeightage[0].createdDate;
          this.exists = true;
          this.btndisplay = false;
        }
     }
    );
  }


  deleteWeightage(event, item){
    this.dialogComponent.openDialog(
      "Are you sure to remove the content?"
    );
  }

  modalData(){
    this._confirmWeightage = this.factors;
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Education")].weightage = this.cepWeightageForm.value.education/5 ;
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Programming Skills")].weightage = this.cepWeightageForm.value.programming/5 ;
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Adaptibility")].weightage = this.cepWeightageForm.value.adaptibility/5 ;
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Problem Solving")].weightage = this.cepWeightageForm.value.problem/5 ;
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Logical Skills")].weightage = this.cepWeightageForm.value.logical/5 ;
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Interpersonal Skills")].weightage = this.cepWeightageForm.value.interpersonal/5 ;
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Cut off Marks")].weightage = this.cepWeightageForm.value.cutoff ;
  }

  closeClick(){
    this.cepWeightageForm.reset();
  }


  openSnackBar(data: string) {
    this._notificationservice.success(data);
  }

}

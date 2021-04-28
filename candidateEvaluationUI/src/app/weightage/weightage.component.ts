import { AfterViewInit, Component, OnInit, ViewChild, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';
import { AdminService } from '../service/admin/admin.service';
import { NotifierComponent } from '../notifier/notifier.component';
import { NotificationService } from '../notifier/notifier.service';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { EvaluationFactors, Weightages } from '../shared/evaluationFactors';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-weightage',
  templateUrl: './weightage.component.html',
  styleUrls: ['./weightage.component.css']
})
export class WeightageComponent implements OnInit , AfterViewInit, OnChanges {

  @ViewChild(DialogsComponent) dialogComponent;

  maximumValue = 1;

  finalValue:number = 0;
  violating = false;
  errMessSlider = false;

  valueEducation: number = 0.1;
  valueProgramming: number = 0.1;
  valueAdaptibility: number = 0.1;
  valueProblem: number = 0.1;
  valueLogical: number = 0.1;
  valueInterpersonal: number = 0.1;

  optionsEducation: Options = {
    floor: 0,
    step: 0.1,
    ceil: 1
  };

  optionsProgramming: Options = {
    floor: 0,
    step: 0.1,
    ceil:1
  };
  optionsAdaptibility: Options = {
    floor: 0,
    step: 0.1,
    ceil:1
  };
  optionsProblem: Options = {
    floor: 0,
    step: 0.1,
    ceil:1
  };

  optionsLogical: Options = {
    floor: 0,
    step: 0.1,
    ceil:1
  };
  optionsInterpersonal: Options = {
    floor: 0,
    step: 0.1,
    ceil:1
  };

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
    private _notificationservice:NotificationService,
    private cd: ChangeDetectorRef
  ) { 
    this.createWeightage();
    this.existingWeightage = [];
    this._confirmWeightage = new Array;
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes)
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
      cutoff: ['', [Validators.required, Validators.min(50)]],
      criteria: this.fb.array([]),
    });
  }


  createWeight(){
    
    if(this.cepWeightageForm.value){
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Education")].weightage = this.cepWeightageForm.value.education ;
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Education")].factorContribution = this.valueEducation;
        
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Programming Skills")].weightage = this.cepWeightageForm.value.programming ;
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Programming Skills")].factorContribution = this.valueProgramming;

        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Adaptibility")].weightage = this.cepWeightageForm.value.adaptibility ;
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Adaptibility")].factorContribution = this.valueAdaptibility;

        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Problem Solving")].weightage = this.cepWeightageForm.value.problem ;
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Problem Solving")].factorContribution = this.valueProblem;

        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Logical Skills")].weightage = this.cepWeightageForm.value.logical ;
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Logical Skills")].factorContribution = this.valueLogical;

        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Interpersonal Skills")].weightage = this.cepWeightageForm.value.interpersonal ;
        this.factors[this.factors.findIndex(x =>x.evaluationFactor === "Interpersonal Skills")].factorContribution = this.valueInterpersonal;

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
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Education")].factorContribution = this.valueEducation*100;
    
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Programming Skills")].weightage = this.cepWeightageForm.value.programming/5 ;
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Programming Skills")].factorContribution = this.valueProblem*100;
    
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Adaptibility")].weightage = this.cepWeightageForm.value.adaptibility/5 ;
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Adaptibility")].factorContribution = this.valueAdaptibility*100;
    
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Problem Solving")].weightage = this.cepWeightageForm.value.problem/5 ;
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Problem Solving")].factorContribution = this.valueProblem*100;
    
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Logical Skills")].weightage = this.cepWeightageForm.value.logical/5 ;
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Logical Skills")].factorContribution = this.valueLogical*100;
    
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Interpersonal Skills")].weightage = this.cepWeightageForm.value.interpersonal/5 ;
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Interpersonal Skills")].factorContribution = this.valueInterpersonal*100;
    
    this._confirmWeightage[this.factors.findIndex(x =>x.evaluationFactor === "Cut off Marks")].weightage = this.cepWeightageForm.value.cutoff ;
  }

  closeClick(){
    this.cepWeightageForm.reset();
  }


  openSnackBar(data: string) {
    this._notificationservice.success(data);
  }
  

  valueChangeSlider(){
    this.finalValue = Number((this.valueEducation + this.valueInterpersonal +this.valueLogical+ this.valueProgramming +this.valueAdaptibility +this.valueProblem).toFixed(1));
    console.log(this.finalValue)
    if(this.finalValue!=1){
      this.errMessSlider = false;
      this.violating = true;
    }

    if(this.finalValue == 1){
      this.errMessSlider = true;
      this.violating = false;
    }
  }
}

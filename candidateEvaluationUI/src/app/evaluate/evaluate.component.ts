import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notifier/notifier.service';
import { AdminService } from '../service/admin/admin.service';
import { AuthenticateService } from '../service/auth/authenticate.service';
import { EvaluateService } from '../service/evaluate/evaluate.service';
import { InterviewerService } from '../service/interviewer/interviewer.service';
import { College } from '../shared/college';
import { Evaluate } from '../shared/evaluation-form';
import { EvaluationFactors, Weightages } from '../shared/evaluationFactors';
import { Result } from '../shared/result';


@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {
  evaluate: FormGroup;
  evaluationData: Evaluate;
  finalEvaluationData:Evaluate;
  selectedTier: string = '';
  selectedWeight: number = 0;
  colleges: College[] ;
  weightage: Weightages[]=EvaluationFactors;
  trainingWeightage = 0;
  knowledgeWeightage = 0;
  adaptabalityWeightage = 0;
  problem_SolvingWeightage = 0;
  logicalWeightage = 0;
  interpersonalWeightage = 0;
  sum = 0;
  interviewerId = 0;
  finalresult:Result;

  userId: number;
  currentUser: any;
  formDisplay=false;


  constructor(private service: EvaluateService, private fb: FormBuilder, private auth: AuthenticateService,
    private router: Router,
    private route: ActivatedRoute,
    private intservice :InterviewerService,
    private notificationservice :NotificationService) {
    this.createForm();
    this.evaluationData = new Evaluate();
    this.colleges=[];
    this.finalresult=new Result();
    this.finalEvaluationData=new Evaluate();

  }


  public createForm() {
    this.evaluate = this.fb.group({
      candidatename: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      candidatecollegename: ['', [Validators.required]],
      date: ['', [Validators.required]],
      hackerrankscore: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      interviewers: ['', [Validators.required]],
      training: ['', [Validators.required]],
      knowledge: ['', [Validators.required]],
      adaptabality: ['', [Validators.required]],
      problem_Solving: ['', [Validators.required]],
      logical: ['', [Validators.required]],
      interpersonal: ['', [Validators.required]],
      recommend_to_hire: ['', [Validators.required]],
      comments: ['', [Validators.required]],

    });

  }



  onSubmit() {
    this.evaluationData.candidatename = this.evaluate.value.candidatename;
    this.evaluationData.email = this.evaluate.value.email;
    this.evaluationData.candidatecollegename = this.evaluate.value.candidatecollegename;
    this.evaluationData.date = this.evaluate.value.date;
    this.evaluationData.hackerrankscore = this.evaluate.value.hackerrankscore;
    this.evaluationData.interviewers = this.evaluate.value.interviewers;
    this.evaluationData.training = this.evaluate.value.training;
    this.evaluationData.knowledge = this.evaluate.value.knowledge;
    this.evaluationData.adaptabality = this.evaluate.value.adaptabality;
    this.evaluationData.problem_Solving = this.evaluate.value.problem_Solving;
    this.evaluationData.logical = this.evaluate.value.logical;
    this.evaluationData.interpersonal = this.evaluate.value.interpersonal;
    this.evaluationData.recommend_to_hire = this.evaluate.value.recommend_to_hire;
    this.evaluationData.comments = this.evaluate.value.comments;
    this.evaluationData.interviewerId = this.currentUser.id;
    this.sum=Number(this.sum)+Number(this.evaluate.value.hackerrankscore);

    
    this.service.createForm(this.evaluationData).subscribe(data => {
      this.finalEvaluationData=<any>data;
      this.evaluate.reset();
      if (this.sum > this.weightage[this.weightage.findIndex(x => x.evaluationFactor === "Cut off Marks")].weightage) {
        this.finalresult.candidateId = this.finalEvaluationData.cid;
        this.finalresult.score = this.sum;
        this.intservice.saveResult(this.finalresult)
          .subscribe((data) =>{this.sum=0;
            this.notificationservice.success("Form Submitted Successfully")
          
          });
      }});
    

    

  }


  selectChangeHandler(event: any) {
    this.selectedTier = event.target.value;
  }

  radioChangeHandler(event: any, factor: string) {
    if (factor === "training") {
      
      this.trainingWeightage = ((this.weightage[this.weightage.findIndex(x =>x.evaluationFactor === "Education")].weightage ) * event.target.value)*(this.weightage[this.weightage.findIndex(x =>x.evaluationFactor === "Education")].factorContribution);
      
    }
    if (factor === "knowledge") {
      this.knowledgeWeightage = ((this.weightage[this.weightage.findIndex(x =>x.evaluationFactor === "Programming Skills")].weightage ) * event.target.value)*(this.weightage[this.weightage.findIndex(x =>x.evaluationFactor === "Programming Skills")].factorContribution);
    }
    if (factor === "adaptabality") {
      this.adaptabalityWeightage = ((this.weightage[this.weightage.findIndex(x =>x.evaluationFactor === "Adaptibility")].weightage ) * event.target.value)*(this.weightage[this.weightage.findIndex(x =>x.evaluationFactor === "Adaptibility")].factorContribution);
    }
    if (factor === "problem_Solving") {
      this.problem_SolvingWeightage = ((this.weightage[this.weightage.findIndex(x =>x.evaluationFactor === "Problem Solving")].weightage ) * event.target.value)*(this.weightage[this.weightage.findIndex(x =>x.evaluationFactor === "Problem Solving")].factorContribution);
    }
    if (factor === "logical") {
      this.logicalWeightage = ((this.weightage[this.weightage.findIndex(x =>x.evaluationFactor === "Logical Skills")].weightage ) * event.target.value)*(this.weightage[this.weightage.findIndex(x =>x.evaluationFactor === "Logical Skills")].factorContribution);
      
    }
    if (factor === "interpersonal") {
      this.interpersonalWeightage = ((this.weightage[this.weightage.findIndex(x =>x.evaluationFactor === "Interpersonal Skills")].weightage ) * event.target.value)*(this.weightage[this.weightage.findIndex(x =>x.evaluationFactor === "Interpersonal Skills")].factorContribution);
    }

    this.sum = this.trainingWeightage + this.knowledgeWeightage + this.adaptabalityWeightage + this.problem_SolvingWeightage + this.logicalWeightage
      + this.interpersonalWeightage;
    

  }


  ngOnInit() {
    this.service.getTier().subscribe((response) => {
      this.colleges = <any>response;
    })

    this.service.getWeightage().subscribe((response) => {
      this.weightage = <any>response;
      if(this.weightage.length==0){
        this.formDisplay=true;
      }
      else{
        this.formDisplay=false;
      }

    })

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  


}
}

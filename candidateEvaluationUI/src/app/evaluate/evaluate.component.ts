import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../service/admin/admin.service';
import { AuthenticateService } from '../service/auth/authenticate.service';
import { EvaluateService } from '../service/evaluate/evaluate.service';
import { College } from '../shared/college';
import { Evaluate } from '../shared/evaluation-form';
import { Weightages } from '../shared/evaluationFactors';


@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {
  evaluate:FormGroup;
  evaluationData:Evaluate;
  selectedTier:string='';
  selectedWeight:number=0;
  colleges:College|any;
  weightage:Weightages;
  trainingWeightage=0;
  knowledgeWeightage=0;
  adaptabalityWeightage=0;
  problem_SolvingWeightage=0;
  logicalWeightage=0;
  interpersonalWeightage=0;
  sum=0;
  interviewerId=0;

  userId: number;


  constructor(private service:EvaluateService,private fb:FormBuilder, private auth: AuthenticateService,
    private router: Router,
    private route: ActivatedRoute,){
    this.createForm();
    this.evaluationData=new Evaluate();
    this.weightage=new Weightages();
    this.colleges=new College();
    
  }


  public createForm(){
    this.evaluate=this.fb.group({
      candidatename:['',[Validators.required, Validators.maxLength(50),Validators.minLength(2)]],
      email:['', [Validators.required , Validators.email]],
      candidatecollegename:['', [Validators.required]],
      date:['', [Validators.required]],
      hackerrankscore:['', [Validators.required,Validators.maxLength(10),Validators.pattern("^[0-9]*$")]],
      interviewers:['', [Validators.required]],
      training:['', [Validators.required]],
      knowledge:['', [Validators.required]],
      adaptabality:['', [Validators.required]],
      problem_Solving:['', [Validators.required]],
      logical:['', [Validators.required]],
      interpersonal:['', [Validators.required]],
      recommend_to_hire:['', [Validators.required]],
      comments:['', [Validators.required]],
      
    });

  }
  


  onSubmit(){
    this.evaluationData.candidatename=this.evaluate.value.candidatename;
    this.evaluationData.email=this.evaluate.value.email;
    this.evaluationData.candidatecollegename=this.evaluate.value.candidatecollegename;
    this.evaluationData.date=this.evaluate.value.date;
    this.evaluationData.hackerrankscore=this.evaluate.value.hackerrankscore;
    this.evaluationData.interviewers=this.evaluate.value.interviewers;
    this.evaluationData.training=this.evaluate.value.training;
    this.evaluationData.knowledge=this.evaluate.value.knowledge;
    this.evaluationData.adaptabality=this.evaluate.value.adaptabality;
    this.evaluationData.problem_Solving=this.evaluate.value.problem_Solving;
    this.evaluationData.logical=this.evaluate.value.logical;
    this.evaluationData.interpersonal=this.evaluate.value.interpersonal;
    this.evaluationData.recommend_to_hire=this.evaluate.value.recommend_to_hire;
    this.evaluationData.comments=this.evaluate.value.comments;
    this.evaluationData.interviewerId=this.interviewerId;
    this.service.createForm(this.evaluationData).subscribe(data=>console.log(data));
    this.evaluate.reset();
  }


  selectChangeHandler(event:any){
    this.selectedTier=event.target.value;
  }

  radioChangeHandler(event:any,factor :string){
    if(factor==="training"){
        this.trainingWeightage=(this.weightage[0].weightage/5)*event.target.value;
    }
    if(factor==="knowledge"){
        this.knowledgeWeightage=(this.weightage[1].weightage/5)*event.target.value;
    }
    if(factor==="adaptabality"){
        this.adaptabalityWeightage=(this.weightage[2].weightage/5)*event.target.value;
    }
    if(factor==="problem_Solving"){
        this.problem_SolvingWeightage=(this.weightage[3].weightage/5)*event.target.value;
    }
    if(factor==="logical"){
        this.logicalWeightage=(this.weightage[4].weightage/5)*event.target.value;
    }
    if(factor==="interpersonal"){
        this.interpersonalWeightage=(this.weightage[5].weightage/5)*event.target.value;
    }

    this.sum=this.trainingWeightage+this.knowledgeWeightage+this.adaptabalityWeightage+this.problem_SolvingWeightage+this.logicalWeightage
    +this.interpersonalWeightage;
    console.log(this.sum);

  }  


ngOnInit(){
    this.service.getTier().subscribe((response)=>{
        this.colleges=response;
        // console.log(this.colleges)
      })

    this.service.getWeightage().subscribe((response)=>{
        this.weightage=<any>response;
        // console.log(this.weightage)
        
    })

    this.auth.currentUser.subscribe((response)=>{
        // console.log(response);
        this.interviewerId=response.id;


        this.route.paramMap.subscribe(
          params => {
            this.userId = +params.get('id');
          }
        );
    
        this.service.extractUser(this.userId)
        .subscribe(
          res =>{
            this.evaluationData =<any>res;
          }
        )

        
    
    })



    
}

submitHandler(){}
}

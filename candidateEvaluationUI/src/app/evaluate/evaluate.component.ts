import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { AdminService } from '../service/admin/admin.service';
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
  weightage:Weightages|any;
//   colleges:College[]=[
//     {   
//       "college_id":1,
//       "name": "SJBIT",
//       "type": "Engineering",
//       "tier": 0
//   },
//   {
//       "college_id":2,
//       "name": "RNSIT",
//       "type": "Engineering",
//       "tier": 0
//   },
//   {
//       "college_id":3,
//       "name": "RVCE",
//       "type": "Engineering",
//       "tier": 0
//   },
//   {
//       "college_id":4,
//       "name": "PESU",
//       "type": "Engineering",
//       "tier": 0
//   },
//   {
//       "college_id":5,
//       "name": "BNMIT",
//       "type": "Engineering",
//       "tier": 0
//   },
//   {
//       "college_id":6,
//       "name": "BIT",
//       "type": "Engineering",
//       "tier": 0
//   },
//   {
//       "college_id":7,
//       "name": "AIT",
//       "type": "Engineering",
//       "tier": 0
//   },
//   {
//       "college_id":8,
//       "name": "DSCE",
//       "type": "Engineering",
//       "tier": 0
//   },
//   {
//       "college_id":9,
//       "name": "NMIT",
//       "type": "Engineering",
//       "tier": 0
//   },
//   {
//       "college_id":10,
//       "name": "CMRIT",
//       "type": "Engineering",
//       "tier": 0
//   },
//   {
//       "college_id":11,
//       "name": "IIMB",
//       "type": "MBA",
//       "tier": 0
//   },
//   {
//       "college_id":12,
//       "name": "BMSCE",
//       "type": "MBA",
//       "tier": 0
//   },
//   {
//       "college_id":13,
//       "name": "SJBIT",
//       "type": "MBA",
//       "tier": 0
//   },
//   {
//       "college_id":14,
//       "name": "REVA",
//       "type": "MBA",
//       "tier": 0
//   },
//   {
//       "college_id":15,
//       "name": "DBIT",
//       "type": "MBA",
//       "tier": 1
//   },
//   {
//       "college_id":16,
//       "name": "CMRIT",
//       "type": "MBA",
//       "tier": 0
//   },
//   {
//       "college_id":17,
//       "name": "Acharya Institute",
//       "type": "MBA",
//       "tier": 0
//   },
//   {
//       "college_id":18,
//       "name": "VIT",
//       "type": "MBA",
//       "tier": 0
//   },
//   {
//       "college_id":19,
//       "name": "BNMIT",
//       "type": "MBA",
//       "tier": 0
//   },
//   {
//       "college_id":20,
//       "name": "DSU",
//       "type": "MBA",
//       "tier": 0
//   }
//   ];
  
  

  constructor(private service:EvaluateService,private fb:FormBuilder,private adminService: AdminService, ){
    this.createForm();
    this.evaluationData=new Evaluate();
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
      comments:['', [Validators.required]]
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
    this.service.createForm(this.evaluationData).subscribe(data=>console.log(data));
    this.evaluate.reset();
  }


  selectChangeHandler(event:any){
    this.selectedTier=event.target.value;
  }

  radioChangeHandler(event:any){
    //   let a:number=event.target.value;

    //   let wei=this.weightage/5;
    //   this.selectedWeight=this.wei*a;
    let a:number=event.target.value;
    let weigtage:number=40/5;
    this.selectedWeight=weigtage*a;
  }  


ngOnInit(){
    this.adminService.getTier().subscribe((response)=>{
        this.colleges=response;
      })

    this.adminService.getWeightage().subscribe((response)=>{
        this.weightage=response;
    })

}

submitHandler(){}
}

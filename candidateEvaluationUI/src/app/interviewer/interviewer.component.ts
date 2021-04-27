import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/service/auth/authenticate.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Evaluate } from '../shared/evaluation-form';
import { Router } from '@angular/router';
import { EvaluateService } from '../service/evaluate/evaluate.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-interviewer',
  templateUrl: './interviewer.component.html',
  styleUrls: ['./interviewer.component.css']
})
export class InterviewerComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public columnDefs;
  private sortingOrder;

  evaluationForm:Evaluate|any;
  


   
  constructor(private service:EvaluateService, private http:HttpClient) {

    // this.service.extractAllForm().subscribe(data=>{
    //   console.log(data);
    // })

 

    // this.columnDefs=[
    //   {
    //     headerName:"Candidate's Name",
    //     field:"candidatename",
    //     width:150,
    //     sortingOrder:["asc","desc"]
    //   },
    //   {
    //     headerName:"Candidate's College Tier",
    //     field:"candidatecollegename",
    //     width:150,
    //     sortingOrder:["asc","desc"]
    //   },
    //   {
    //     headerName:"Date",
    //     field:"date",
    //     width:150,
    //     sortingOrder:["asc","desc"]
    //   },
    //   {
    //     headerName:"Hackerrank Score",
    //     field:"hackerrankscore",
    //     width:150,
    //     sortingOrder:["asc","desc"]
    //   },
    //   {
    //     headerName:"Interviewer(s)",
    //     field:"interviewer",
    //     width:150,
    //     sortingOrder:["asc","desc"]
    //   },
    //   {
    //     headerName:"Education/Training",
    //     field:"training",
    //     width:150,
    //     sortingOrder:["asc","desc"]
    //   },
    //   {
    //     headerName:"Programming Knowledge",
    //     field:"knowledge",
    //     width:150,
    //     sortingOrder:["asc","desc"]
    //   },
    //   {
    //     headerName:"Logical Reasoning",
    //     field:"logical",
    //     width:150,
    //     sortingOrder:["asc","desc"]
    //   },
    //   {
    //     headerName:"Interpersonal & Communication Skills",
    //     field:"interpersonal",
    //     width:150,
    //     sortingOrder:["asc","desc"]
    //   },
    //   {
    //     headerName:"Recommend To Hire",
    //     field:"recommend_to_hire",
    //     width:150,
    //     sortingOrder:["asc","desc"]
    //   },
    //   {
    //     headerName:"Additional Comments",
    //     field:"comments",
    //     width:150,
    //     sortingOrder:["asc","desc"]
    //   }
    // ];



    }

// onGridReady(params){
//   this.gridApi=params.api;
//   this.gridColumnApi=params.gridColumnApi;
//   this.http.get("http://localhost:8080/cep/interviewer/evaluate").subscribe(data=>{
//     params.api.setRowData(data)
//   })
//   params.api.setRowData(this.evaluationForm);

// }
   ngOnInit(): void {
     this.service.extractAllForm().subscribe((response)=>{
       this.evaluationForm=response;
     })
   }


  }
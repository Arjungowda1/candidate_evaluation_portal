import { Component, OnInit } from '@angular/core';
import { Evaluate } from '../shared/evaluation-form';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluateService } from '../service/evaluate/evaluate.service';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-interviewer',
  templateUrl: './interviewer.component.html',
  styleUrls: ['./interviewer.component.css']
})
export class InterviewerComponent implements OnInit {


  userId: number;

  formDisplay = false;

  evaluationForm: Evaluate[];
  currentUser: any;
  columnDefs: { headerName: string; field: string; width: number; sortable: boolean; filter: boolean; floatingFilter: boolean; wrapText: boolean }[];
  gridApi: any;
  gridColumnApi: any;



  constructor(private service: EvaluateService, private http: HttpClient, private router: Router,
    private route: ActivatedRoute,) {


    this.columnDefs = [
      { headerName: "Candidate's Name", width: 200, field: "candidatename", sortable: true, filter: true, floatingFilter: true, wrapText: true },
      { headerName: " Email", width: 290, field: "email", sortable: true, filter: true, floatingFilter: true, wrapText: true },
      { headerName: "Interview Date", width: 200, field: "date", sortable: true, filter: true, floatingFilter: true, wrapText: true },
      { headerName: "Recommend To Hire", width: 270, field: "recommend_to_hire", sortable: true, filter: true, floatingFilter: true, wrapText: true },
      { headerName: "Additional Comments", width: 520, field: "comments", sortable: true, filter: true, floatingFilter: true, wrapText: true },
    ];




  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.http.get("http://localhost:8080/cep/interviewer/evaluate/" + this.currentUser.id).subscribe(data => {
      this.evaluationForm = <any>data['body'];
      if (this.evaluationForm.length == 0) {
        this.formDisplay = true;
      }
      else {
        params.api.setRowData(this.evaluationForm);
        this.formDisplay = false;
      }
    })


  }
  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.extractAllForm(this.currentUser.id).subscribe((response) => {
      this.evaluationForm = response['body'];

    })

  }


}

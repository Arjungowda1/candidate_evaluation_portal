import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InterviewerService } from '../service/interviewer/interviewer.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-interviewer-header',
  templateUrl: './interviewer-header.component.html',
  styleUrls: ['./interviewer-header.component.css']
})
export class InterviewerHeaderComponent implements OnInit {

  userId: number;
  data: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private interviewerService: InterviewerService
  ) { 
    this.data = new User();
  }


  ngOnInit(): void {

    this.route.paramMap.subscribe(
      params => {
        this.userId = +params.get('id');
      }
    );

    this.interviewerService.getInterviewers(this.userId)
    .subscribe(
      res =>{
        this.data =<any>res;
      }
    )

  }

}

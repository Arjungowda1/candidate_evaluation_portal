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
  currentUser: any;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private interviewerService: InterviewerService
  ) { 
    this.data = new User();
  }


  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


    this.interviewerService.getInterviewers(this.currentUser.id)
    .subscribe(
      res =>{
        this.data =<any>res;
        
      }
    )
    

  }

}

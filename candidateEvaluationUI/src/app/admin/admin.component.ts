import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../notifier/notifier.service';
import { AdminService } from '../service/admin/admin.service';
import { PasswordService } from '../service/password.service';
import { Evaluate } from '../shared/evaluation-form';
import { SignUpApproval } from '../shared/login';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('agGrid') agGrid: any;

  finalSelects:Evaluate[];
  
  resp:SignUpApproval[];
  columnDefs: { headerName: string; field: string; width: number; sortable: boolean; filter: boolean; floatingFilter: boolean; wrapText: boolean }[];
  gridApi: any;
  gridColumnApi: any;
  formDisplay = false;



  constructor(private userService: PasswordService,
    private _notificationservice:NotificationService,
    private adminService: AdminService) {
      this.finalSelects = [];

      this.columnDefs = [
        { headerName: "Name", width: 200, field: "candidatename", sortable: true, filter: true, floatingFilter: true, wrapText: true },
        { headerName: "Email", width: 200, field: "email", sortable: true, filter: true, floatingFilter: true, wrapText: true },
        { headerName: "College", width: 130, field: "candidatecollegename", sortable: true, filter: true, floatingFilter: true, wrapText: true },
        { headerName: "Tier", width: 120, field: "tier", sortable: true, filter: true, floatingFilter: true, wrapText: true },
        { headerName: "Type", width: 140, field: "collegeType", sortable: true, filter: true, floatingFilter: true, wrapText: true },
        { headerName: "Interview Date", width: 200, field: "date", sortable: true, filter: true, floatingFilter: true, wrapText: true },
        { headerName: "Score", width: 120, field: "score", sortable: true, filter: true, floatingFilter: true, wrapText: true },
        { headerName: "Comments", width: 370, field: "comments", sortable: true, filter: true, floatingFilter: true, wrapText: true },
      ];
     }

     onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.gridColumnApi;
      this.adminService.getAllSelects()
      .subscribe(res =>{
        this.finalSelects = <any> res;
        if (this.finalSelects.length == 0) {
          this.formDisplay = true;
        }
        else {
          params.api.setRowData(this.finalSelects);
          this.formDisplay = false;
        } 
      });
    }
  ngOnInit(): void {
    this.userService.requestSignupUsers()
      .subscribe(
        res =>{
          this.resp = <any>res;
          if(this.resp.length>0){
            this._notificationservice.info("New SignUp Request! Please check");
          }
        }
      );
  }
 
  onBtnExport(){
    this.agGrid.api.exportDataAsCsv({
      fileName:"final-selects"
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('agGrid') agGrid: any;
  
  columnDefs = [
    { headerName: "Candidate Name",width:200, field: "Name", sortable: true, filter: true, floatingFilter:true ,wrapText: true},
    { headerName: "Email", field: "Email" ,width:290, sortable: true, filter: true, floatingFilter:true, wrapText: true},
    { headerName: "Score", field: "Score", sortable: true, filter: true, floatingFilter:true, wrapText: true},
    { headerName: "College", field: "College", sortable: true, filter: true, floatingFilter:true, wrapText: true},
    { headerName: "Tier", field: "Tier", sortable: true, filter: true, floatingFilter:true, wrapText: true},
  ];

  rowData = [
    {
      Name: 'Arjun',
      Email: 'arjunce@gmail.com',
      Score: 20,
      College:'SJBIT',
      Tier:3,
    },
    {
      Name: 'demo',
      Email: 'demo@gmail.com',
      Score: 214,
      College:'AJBIT',
      Tier:2,
    },
    {
      Name: 'new',
      Email: 'new@gmail.com',
      Score: 201,
      College:'BJBIT',
      Tier:2,
    },
    {
      Name: 'old',
      Email: 'old@gmail.com',
      Score: 30,
      College:'CJBIT',
      Tier:2,
    },
    {
      Name: 'hello',
      Email: 'hello@gmail.com',
      Score: 10,
      College:'DJBIT',
      Tier:1,
    },
    {
      Name: 'bye',
      Email: 'bye@gmail.com',
      Score: 200,
      College:'EJBIT',
      Tier:1,
    },
    {
      Name: 'welcome',
      Email: 'welcome@gmail.com',
      Score: 230,
      College:'SJBIT',
      Tier:1,
    },
    {
      Name: 'world',
      Email: 'world@gmail.com',
      Score: 201,
      College:'SJBIT',
      Tier:3,
    },
    {
      Name: 'world',
      Email: 'world@gmail.com',
      Score: 201,
      College:'SJBIT',
      Tier:3,
    },
    {
      Name: 'world',
      Email: 'world@gmail.com',
      Score: 201,
      College:'SJBIT',
      Tier:3,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
 
  onBtnExport(){
    this.agGrid.api.exportDataAsCsv({
      fileName:"final-selects"
    });
  }
}

import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NotificationService } from '../notifier/notifier.service';
import { AdminService } from '../service/admin/admin.service';
import { College, Colleges } from '../shared/college';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit {
  @ViewChild("test") container;

  colleges: College[] = Colleges;
  flag = true;
  selectedTier: number;

  collegeDataDB:College[] = Colleges;
  tierExistsBackend = false;
  tierclicked = true;
  collegepicked = true;
  

  selectedRowIds: Set<number> = new Set<number>();


  constructor(private adminService: AdminService,
    private _notificationservice:NotificationService,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.getCollegeDBData();
  }

  getCollegeDBData(){
    this.adminService.getTier()
    .subscribe(res =>{
      this.collegeDataDB =<any> res;
      this.tierExistsBackend = true;
    })
  }

  onRowClick(id: number) {
    this.collegepicked = false;
    if(this.selectedRowIds.has(id)) {
     return this.selectedRowIds.delete(id);
    }
    else {
      this.colleges[this.colleges.findIndex(x => x.college_id == id)].tier = this.selectedTier;
      this.selectedRowIds.add(id);
    }
  }

  rowIsSelected(id: number) {
    return this.selectedRowIds.has(id);
  }

  getSelectedRows(){
    return this.colleges.filter(x => this.selectedRowIds.has(x.college_id));
  }

  onLogClick() {
    this.adminService.setTier(this.getSelectedRows())
    .subscribe(
      res =>{
        if(res)
        {
          this.getCollegeDBData();
          this._notificationservice.success("Tier Assigned successfully");
          setTimeout(()=>window.location.reload(),1000);
          
        }
        else{
          this._notificationservice.error("Attempting to overwrite existing value! Please delete before writing new value");
          setTimeout(()=>window.location.reload(),3000);
        }
      }
    )
  }

  selectChange(event:any){
    this.selectedTier = event.target.value;
    this.tierclicked = false;
  }


  GetTier(id: number){
    var index = this.collegeDataDB.findIndex(x => x.college_id == id);
    if (index == -1)
      {
        return "Unassigned"
      }
    else{
      return this.collegeDataDB[index].tier
    }
     
  }

  deleteTier(id:number){
    if(this.GetTier(id) === "Unassigned"){
      this._notificationservice.error("No Tier Assigned yet");
      setTimeout(()=>window.location.reload(),1000);
    }
    else{
      this.adminService.deleteTier(id)
    .subscribe(
      res =>{
        if(res){
          this._notificationservice.info("Tier removed successfully")
          this.ngOnInit();
          setTimeout(()=>window.location.reload(),1000);
        }
      }
    )
    }
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { IndexComponent } from './index/index.component';
import { InterviewerComponent } from './interviewer/interviewer.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UserComponent } from './user/user.component';
import { WeightageComponent } from './weightage/weightage.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: '', redirectTo:'/index', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent},
  { path: 'interviewer/:id', component: InterviewerComponent},
  { path: 'user', component:UserComponent},
  { path: 'weightage', component:WeightageComponent},
  { path: 'statistics', component:StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

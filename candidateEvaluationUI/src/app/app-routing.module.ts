import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { IndexComponent } from './index/index.component';
import { InterviewerComponent } from './interviewer/interviewer.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: '', redirectTo:'/index', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent},
  { path: 'interviewer', component: InterviewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

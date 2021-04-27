import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CollegeComponent } from './college/college.component';
import { IndexComponent } from './index/index.component';
import { InterviewerComponent } from './interviewer/interviewer.component';
import { AuthGuard } from './service/guards/auth.guard';
import { Role } from './shared/role';
import { UserComponent } from './user/user.component';
import { WeightageComponent } from './weightage/weightage.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: '', redirectTo:'/index', pathMatch: 'full' },
  { path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },
  { path: 'interviewer/:id',
    component: InterviewerComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.USER]}
  },
  { 
    path: 'user', 
    component:UserComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },
  { 
    path: 'weightage', 
    component:WeightageComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },
  { 
    path: 'college',
    component: CollegeComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ADMIN]}
  },

  { path: '**', redirectTo: 'index' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

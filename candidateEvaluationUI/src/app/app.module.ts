import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { InterviewerComponent } from './interviewer/interviewer.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { InterviewerHeaderComponent } from './interviewer-header/interviewer-header.component';
import { WeightageComponent } from './weightage/weightage.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NotifierComponent } from './notifier/notifier.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { EvaluateComponent } from './evaluate/evaluate.component';
import { CollegeComponent } from './college/college.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FooterComponent,
    AdminComponent,
    InterviewerComponent,
    UserComponent,
    HeaderComponent,
    InterviewerHeaderComponent,
    WeightageComponent,
    StatisticsComponent,
    NotifierComponent,
    DialogsComponent,
    EvaluateComponent,
    CollegeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgsRevealModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

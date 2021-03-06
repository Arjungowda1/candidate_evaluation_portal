import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { Ng5SliderModule } from 'ng5-slider';


import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { InterviewerComponent } from './interviewer/interviewer.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { InterviewerHeaderComponent } from './interviewer-header/interviewer-header.component';
import { WeightageComponent } from './weightage/weightage.component';
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
    NotifierComponent,
    DialogsComponent,
    EvaluateComponent,
    CollegeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgsRevealModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgGridModule.withComponents([]),
    ShowHidePasswordModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

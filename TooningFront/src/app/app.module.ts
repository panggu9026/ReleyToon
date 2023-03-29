import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes} from '@angular/router'; //라우터
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ParticipatingWorksComponent } from './participating-works/participating-works.component';
import { ParticipatingComponent } from './participating/participating.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { PopularTemplatesComponent } from './main/popular-templates/popular-templates.component';
import { HeaderComponent } from './header/header.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { RelayParticipantDetailPageComponent } from './relay-participant-detail-page/relay-participant-detail-page.component';
import { ParticipatingModifyComponent } from './participating-modify/participating-modify.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommentsComponent } from './comments/comments.component';
import { LoginComponent } from './login/login.component';
const router : Routes = [
  {path : 'participating-modify', component : ParticipatingModifyComponent},
  {path : 'relay-participant-detail-page', component : RelayParticipantDetailPageComponent},
  {path : 'participating-works', component : ParticipatingWorksComponent},
  {path : 'participating', component : ParticipatingComponent},
  {path : 'main', component : MainComponent},
  {path : 'login', component : LoginComponent},
  {path : '', redirectTo : '/main',  pathMatch : 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    ParticipatingWorksComponent,
    ParticipatingComponent,
    MainComponent,
    PopularTemplatesComponent,
    HeaderComponent,
    RelayParticipantDetailPageComponent,
    ParticipatingModifyComponent,
    CommentsComponent,
    LoginComponent,
  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router,{enableTracing:false}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }

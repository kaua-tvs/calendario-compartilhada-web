import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './containers/home/home.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { DetailsMembersComponent } from './containers/members/details-members/details-members.component';
import { LoginComponent } from './containers/login/login.component';
import { AddMembersComponent } from './containers/members/add-members/add-members.component';
import { AuthGuard } from './inteceptors/auth/auth.guard';
import { AuthService } from './inteceptors/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddMembersComponent,
    DetailsMembersComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    ModalModule.forRoot()
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

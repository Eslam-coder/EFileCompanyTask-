import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { ContactsComponent } from './Components/Contacts/contacts/contacts.component';
import { HeaderComponent } from './Components/Header/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AddContactComponent } from './Components/Dashboard/AddContact/add-contact/add-contact.component';
import { EditContactComponent } from './Components/Dashboard/EditContact/edit-contact/edit-contact.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactsComponent,
    HeaderComponent,
    AddContactComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

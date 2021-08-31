import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { ContactsComponent } from './Components/Contacts/contacts/contacts.component';
import { AddContactComponent } from './Components/Dashboard/AddContact/add-contact/add-contact.component';
import { EditContactComponent } from './Components/Dashboard/EditContact/edit-contact/edit-contact.component';
import { LoginComponent } from './Components/Login/login/login.component';

const routes: Routes = [
  {path:'Login',component:LoginComponent},
  {path:'Contacts',component:ContactsComponent,canActivate:[AuthenticationGuard]},
  {path:'',component:LoginComponent},
  {path:'AddContact',component:AddContactComponent,canActivate:[AuthenticationGuard]},
  {path:'Contacts/EditContact/:id',component:EditContactComponent,canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

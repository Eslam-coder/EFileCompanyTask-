import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { IContact } from 'src/app/Interfaces/Contact/icontact';
import { ContactService } from 'src/app/Services/Contact/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  FirstFiveContact:any;
  AllContacts:IContact[];
  AppearPage:boolean=true;
  response:boolean;
  SearchFilter:any;
  term:string;
  ContactById:any;
  constructor(private ContactServ:ContactService,
              private toastr:ToastrService,
              private router:Router) { 
      this.SearchFilter={
        filter:''
      }
              }

  ngOnInit(): void {
    //Get First Five Contact From DataBase
    this.ContactServ.GetDividedByFirstFive().subscribe(
      (data)=>{
        this.FirstFiveContact=data;
        //console.log(this.FirstFiveContact);
      },
      (error)=>{
        console.log(error);
      }
    )

    //Get All Contacts
    this.ContactServ.GetAllContacts().subscribe(
      (data)=>{
        this.AllContacts = data;
        if(this.AllContacts.length>15){
          this.AppearPage=false;
        }
        else{
          this.AppearPage=true;
        }
      }
    )
  }

  //Delete Contact
  Delete(ID:number){
    this.response = confirm('Are you Sure To Delete Contact?')
    if(this.response==true){
    this.ContactServ.DeleteContact(ID).subscribe(
      (data)=>{
        this.toastr.success('Done','Contact Deleted Successfully')
      },
      (error)=>{
        this.toastr.error('Failed :(','There is an error')
        console.log(error);
      }
    )
    }
    else{
      this.router.navigateByUrl('Contacts')
    }
  }

  //Get First Five Contact From DataBase
  GetDividedByFirstFive(){
    this.ContactServ.GetDividedByFirstFive().subscribe(
      (data)=>{
        this.FirstFiveContact=data;
        //console.log(this.FirstFiveContact);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  //Get Next Five Contact From DataBase
  GetDividedByNextFive(num:number){
    this.ContactServ.GetDividedByNextFive(num).subscribe(
      (data)=>{
        this.FirstFiveContact=data;
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  //Search Or Filter
  Search(f:NgForm){
    this.term=this.SearchFilter.filter;
    console.log(this.SearchFilter)
    //debugger
    this.ContactServ.Search(this.SearchFilter).subscribe(
      (data)=>{
        this.FirstFiveContact=data;
        console.log(this.FirstFiveContact)
      },
      (error)=>console.log(error)
    )
  }

  EditContact(contactId){
    this.ContactServ.GetContactById(contactId).subscribe(
      (data)=>{
        this.ContactById=data;
        if(this.ContactById.isLocked==false){
          this.response = confirm('Are you Sure To Edit Contact After Editing Contact become Locked?')
          if(this.response==true){
          this.router.navigateByUrl(`/Contacts/EditContact/`+`${contactId}`)
        }
        else{
          this.router.navigateByUrl(`/Contacts`)
        }
      }
        else{
          alert('Contact is locked.Not Allowable to Edit');
        }
      },
      (error)=>{
        console.log(error)
      }
    
    )

  }
}

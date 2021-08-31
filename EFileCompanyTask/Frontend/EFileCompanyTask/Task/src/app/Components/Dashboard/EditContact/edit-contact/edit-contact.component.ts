import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IContact } from 'src/app/Interfaces/Contact/icontact';
import { ContactService } from 'src/app/Services/Contact/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactId:number;
  Contact:any;
  constructor(private route:ActivatedRoute,
              private ContactServ:ContactService,
              private toastr:ToastrService,
              private router:Router) { }

  ngOnInit(): void {
    //Get Contact ID From URL
    this.contactId=this.route.snapshot.params['id']

    this.ContactServ.GetContactById(this.contactId).subscribe(
      (data)=>{
        this.Contact=data;
      },
      (error)=>{
        console.log(error)
      }
    )

  }

  submit(f:NgForm){
    this.ContactServ.UpdateContact(this.contactId,this.Contact).subscribe(
      (data)=>{
        //console.log(data)
        this.toastr.success('Contact Edited Successfully','congrats')
        this.router.navigateByUrl('Contacts')
      },
      (error)=>{
        console.log(error),
        this.toastr.error('Edit Contact Failed','Oops!')
      }
    )
  }
}

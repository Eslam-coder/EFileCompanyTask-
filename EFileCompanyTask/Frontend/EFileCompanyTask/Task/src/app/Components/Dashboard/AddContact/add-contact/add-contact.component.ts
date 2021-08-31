import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IContact } from 'src/app/Interfaces/Contact/icontact';
import { ContactService } from 'src/app/Services/Contact/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  form:FormGroup;
  Contact:IContact;
  constructor(private fb:FormBuilder,
              private Toaster:ToastrService,
              private router:Router,
              private ContactServ:ContactService) { }
          
  ngOnInit(): void {
    //Reactive Form 
    this.form = this.fb.group({
      name:[''],
      phone:[''],
      address:[''],
      notes:['']
    })
  }

  onSubmit(){
    this.Contact={
        Name:this.form.get('name').value,
        Phone:this.form.get('phone').value,
        Address:this.form.get('address').value,
        Notes:this.form.get('notes').value,
    }

    this.ContactServ.CreateContact(this.Contact).subscribe(
      (data)=>{
        this.Toaster.success('New Contact added successfully','Congurats')
        this.router.navigateByUrl('/Contacts')
      },
      (error)=>{
        console.log(error)
        this.Toaster.error('Failed :(')
      }
    )

  }

}

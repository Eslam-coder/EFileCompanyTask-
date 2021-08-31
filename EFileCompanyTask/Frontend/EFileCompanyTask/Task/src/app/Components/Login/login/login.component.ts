import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/Interfaces/User/iuser';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  User:any;
  UserDetails:any;
  constructor(private UserServ:UserService,
              private toastr: ToastrService,
              private route:Router) {
    this.User={
      Name:'',
      Password:null
    }
   }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    this.UserServ.Login(this.User).subscribe(
      (data)=>{
        this.UserDetails = data;
        //console.log(data);
        //console.log("Login success")
        //Put userName in LocalStorage
        localStorage.setItem('token',this.UserDetails.userName)
        //Put userID in LocalStorage
        localStorage.setItem('token2',this.UserDetails.userId)
        //Appear Toaster Success
         this.toastr.success("Login Successfully","Congurats")
         //add router navigate 
         this.route.navigateByUrl('Contacts');
      },
      (error)=>{
        console.log("Login fail")
         //Appear Toaster Success
        this.toastr.error("There is no account registered with that email. Please enter a registered email or continue to Create an account","Welcome")
      }
    )

  }
}

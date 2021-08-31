import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/Services/AuthService/auth-service.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:string;
  appearAdmin:Boolean=true;
  constructor(private AuthServ:AuthServiceService,
              private UserServ:UserService,
              private route:Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  isLogged(){
    this.userName = localStorage.getItem('token')
    //Show & Hide Dashboard in dropdownlist
    if(localStorage.getItem('token')=='user1'||localStorage.getItem('token')=='user2')
    {
        this.appearAdmin = false;
    }
    else{
      this.appearAdmin = true;
    }
   // console.log(this.UserEamil);
    return this.AuthServ.isLoggedIn;
    
  }

  logOut(){
       localStorage.removeItem('token');
       localStorage.removeItem('token2');
       this.toastr.success('GoodBye');
       this.route.navigateByUrl('Login');
  }

}

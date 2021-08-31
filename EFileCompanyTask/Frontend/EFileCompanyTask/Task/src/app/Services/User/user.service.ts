import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/Interfaces/User/iuser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  GetAllUsers():Observable<IUser[]>{
    return this.http.get<IUser[]>(`${environment.ApiUrl}/api/User/GetAllUsers`);
  }

  GetUserById(UserID:number):Observable<IUser>{
    return this.http.get<IUser>(`${environment.ApiUrl}/api/UsersListsList/GetUserById?ID=`+`${UserID}`);
  }

  UpdateUser(UserID:number,UserUpdated:any){
    return this.http.put(`${environment.ApiUrl}/api/User/EditUser?ID=`+`${UserID}`,UserUpdated);
  }

  DeleteUser(UserID:number):Observable<IUser>{
    return this.http.delete<IUser>(`${environment.ApiUrl}/api/User/DeleteUser?ID=`+`${UserID}`);
  }

  CreateUser(NewUser:IUser):Observable<IUser>{
    const httpOptions ={headers:new HttpHeaders({
      'Content-Type': 'application/json',
       'Accept': ' */*'
        // ,'Authorization': 'my-auth-token'
      })};
    return this.http.post<IUser>(`${environment.ApiUrl}/api/User/AddUser`,NewUser,httpOptions)
  }

  Login(User:IUser):Observable<IUser>{
    const httpOptions ={headers:new HttpHeaders({
      'Content-Type': 'application/json',
       'Accept': ' */*'
        // ,'Authorization': 'my-auth-token'
      })};
    return this.http.post<IUser>(`${environment.ApiUrl}/api/Account/Login`,User,httpOptions)
  }
}

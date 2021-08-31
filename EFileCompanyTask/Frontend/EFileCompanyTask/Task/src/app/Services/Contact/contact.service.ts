import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from 'src/app/Interfaces/Contact/icontact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  GetAllContacts():Observable<IContact[]>{
    return this.http.get<IContact[]>(`${environment.ApiUrl}/api/Contact/GetAllContacts`);
  }

  GetContactById(ContactID:number):Observable<IContact>{
    return this.http.get<IContact>(`${environment.ApiUrl}/api/Contact/GetContactById?ID=`+`${ContactID}`);
  }

  GetDividedByFirstFive(){
    return this.http.get(`${environment.ApiUrl}/api/Contact/GetDividedByFirstFive`);
  }

  GetDividedByNextFive(num:number):Observable<IContact[]>{
    return this.http.get<IContact[]>(`${environment.ApiUrl}/api/Contact/GetDividedByNextFive?num=`+`${num}`);
  }

  UpdateContact(ContactID:number,ContactUpdated:any){
    return this.http.put(`${environment.ApiUrl}/api/Contact/EditContact?ID=`+`${ContactID}`,ContactUpdated);
  }

  DeleteContact(ContactID:number):Observable<IContact>{
    return this.http.delete<IContact>(`${environment.ApiUrl}/api/Contact/DeleteContact?ID=`+`${ContactID}`);
  }

  CreateContact(NewContact:IContact):Observable<IContact>{
    const httpOptions ={headers:new HttpHeaders({
      'Content-Type': 'application/json',
       'Accept': ' */*'
        // ,'Authorization': 'my-auth-token'
      })};
    return this.http.post<IContact>(`${environment.ApiUrl}/api/Contact/AddContact`,NewContact,httpOptions)
  }

  Search(term){
    const httpOptions ={headers:new HttpHeaders({
      'Content-Type': 'application/json',
       'Accept': ' */*'
        // ,'Authorization': 'my-auth-token'
      })};
    return this.http.post(`${environment.ApiUrl}/api/Contact/Search`,term)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
   apiUrl:string = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getApi() {
    return new Promise((resolve, reject) => {
       return this.http.get<any>(this.apiUrl).subscribe((res) => {
         resolve(res);
       },(err) => {
         reject(err);
       })
    })
  }

  getObsApi(){
    return this.http.get<any>(this.apiUrl);
  }

  addApi(data:any):Observable<any>{
    return this.http.post<any>(this.apiUrl, data);
  }

  deleteApi(id:any){
    return this.http.delete<any>(this.apiUrl+id);
  }

  updateApi(id:any, data:any){
    return this.http.patch<any>(this.apiUrl+id, data);
  }

  getApiById(id:any){
    return this.http.get<any>(this.apiUrl+id);
  }
}

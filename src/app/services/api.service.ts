import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
}

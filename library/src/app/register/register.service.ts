import { allAPI } from './../../common/api';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private api = environment.server
  constructor(private http: HttpClient) {}

  register(obj) {
    console.log(obj)
      return this.http.post<any>(allAPI.register, obj)
  }
  
}

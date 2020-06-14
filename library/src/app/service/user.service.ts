import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allAPI } from 'src/common/api'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = environment.server
  constructor(private http: HttpClient) { }


  getUserList() {
    return this.http.post<any>(allAPI.admin_users_list, {})
  }

  createUser(input) {
    return this.http.post<any>(allAPI.admin_users_create_user, { input })
  }

  deleteUser(user_username) {
      return this.http.post<any>(allAPI.admin_users_delete_user, { user_username })
  }

  editUser(input) {
      return this.http.post<any>(allAPI.admin_users_edit_user, { input })
  }
}

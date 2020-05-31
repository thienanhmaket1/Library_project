import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { allAPI } from 'src/common/api'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string = null
    private user: BehaviorSubject<object> = new BehaviorSubject<object>(null)
    public api = environment.server
    private headers: any = new HttpHeaders()

  constructor(private http: HttpClient, private router: Router) { }


  public set setUser(v) {
    this.user.next(v)
}

public get getUser(): any {
    return this.user
}

public get getUserValue(): any {
    return this.user.value
}

login(user_username: string, user_password: string) {
    return this.http.post<any>(allAPI.authen_login, { user_username, user_password })
}

setToken(token) {
    this.token = token
    localStorage.setItem('token', token)
}

getToken() {
    return this.token || (this.token = localStorage.getItem('token'))
}

removeToken() {
    this.token = null
    localStorage.removeItem('token')
}


logout(willNavigate = false) {
    this.setUser = null
    this.removeToken()
    if (willNavigate) {
        this.goLogin()
    }

    return false
}

isLoggedIn() {
    if (!!this.getUserValue) {
        // return of(this.user)
        return this.user
    }
    const token = this.getToken()
    // neu chua cho token thi chac chan chua dang nhap
    if (!token) {
        this.logout()
        return of(null)
    }
    this.headers = new HttpHeaders().set('Authorization', `${token}`)
    return this.http.post<any>(allAPI.authen_verify_token, {}, { headers: this.headers }).pipe(
        map(
            (res: any) => {
                if (res.code !== 0) {
                    return this.logout()
                }

                this.setToken(token)

                this.setUser = res.data.user

                return this.getUserValue
            },
            (error) => this.logout()
        )
    )
}

goLogin() {
    this.router.navigate(['/login'])
}

goHome() {
    this.router.navigate(['/dashboard/home'])
}
}

import { AuthenticationService } from './../authentication/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup = new FormGroup({
    usernameFormControl: new FormControl('', {
      validators: Validators.required,
  }),
  passwordFormControl: new FormControl('', {
      validators: Validators.required,
  }),
  })
  constructor(private router: Router,private sharedService: SharedService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {}

  login() {
    if (!this.loginFormGroup.valid) {
        this.sharedService.showMessage({
            content: 'Tài khoản và mật khẩu là bắt buộc!',
            title: 'Lỗi',
            status: 'danger',
        })

        return
    }
    const { usernameFormControl, passwordFormControl } = this.loginFormGroup.getRawValue()

    this.authenticationService.login(usernameFormControl, passwordFormControl).subscribe(
        (res) => {
            const {
                data: { user, token },
            } = res
            if (res.code === 1) {
                this.sharedService.showMessage({
                    content: 'Tài khoản hoặc mật khẩu sai hoặc tài khoản không tồn tại',
                    title: 'Lỗi',
                    status: 'danger',
                })

                return
            }

            if (res.code === 0) {
                this.sharedService.showMessage({
                    content: 'Đăng nhập thành công',
                    title: 'Xin chào',
                    status: 'primary',
                })
            }

            this.authenticationService.setToken(token)

            this.authenticationService.setUser = user

            this.authenticationService.goHome()
        },
        (err) => {
            if (err.status === 401) {
                this.sharedService.showMessage({
                    content: 'Unauthorized User or User does not exist',
                    title: 'Error',
                    status: 'danger',
                })
            }
        }
    )
}
}

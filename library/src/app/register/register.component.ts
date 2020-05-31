import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormGroup = new FormGroup({
    useridFormControl: new FormControl('', {
      validators: Validators.required,
  }),
    usernameFormControl: new FormControl('', {
        validators: Validators.required,
    }),
    passwordFormControl: new FormControl('', {
        validators: Validators.required,
    }),
    fullnameFormControl: new FormControl(''),
    emailFormControl: new FormControl(''),
    phoneFormControl: new FormControl(''),
    permissionFormControl: new FormControl(''),
})
  constructor(private router: Router, private toastService: NbToastrService, private registerService: RegisterService) { }

  ngOnInit(): void {}

  register() {
    if (!this.registerFormGroup.valid) {
        this.toastService.show('Username and password is required !', 'Error', {
            status: 'danger',
            position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        })

        return
    }

    const {
        useridFormControl,
        usernameFormControl,
        passwordFormControl,
        fullnameFormControl,
        emailFormControl,
        phoneFormControl,
        permissionFormControl,
    } = this.registerFormGroup.getRawValue()
    console.log(this.registerFormGroup.getRawValue())
    const obj = {
        user_id: useridFormControl,
        user_username: usernameFormControl,
        user_fullname: fullnameFormControl,
        user_email: emailFormControl,
        user_phone: phoneFormControl,
        user_permission_code: permissionFormControl,
        user_password: passwordFormControl,
    }
    
    this.registerService.register(obj).subscribe(
        (res) => {
            if (res.code === 0) {
                this.toastService.show(`Create successfully`, 'Success', {
                    status: 'primary',
                    position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
                })
            }
            if (res.code === 5) {
                this.toastService.show(`User already exists`, 'Error', {
                    status: 'danger',
                    position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
                })
            }
            this.router.navigate(['login'])
        },
        (err) => {}
    )
}

}

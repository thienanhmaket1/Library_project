import { MessageDialogComponent } from './../../shared/message-dialog/message-dialog.component';
import { UserService } from './../../service/user.service';
import { NbDialogRef, NbToastrService, NbDialogService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { AuthenticationService } from './../../authentication/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() data: any
  @Input() type: any

  editUserFormGroup = new FormGroup({})

    fakeUserProperties = [
        'column_id',
        'column_username',
        'column_password',
        'column_fullname',
        'column_email',
        'column_phone',
        'column_permission_code',
    ]
    realUserProperties = ['Mã', 'Tài khoản', 'Mật khẩu', 'Họ và tên', 'Email', 'Số điện thoại', 'Quyền truy cập']

    user
    isEditing
    isViewing
    isEditable
    isCreating
    rows
    inputType = 'text'
    isReadOnly = false

    constructor(
        private authenticationService: AuthenticationService,
        private nbDialogRef: NbDialogRef<UserDetailComponent>,
        private manageUserService: UserService,
        private toastService: NbToastrService,
        private dialogService: NbDialogService,
    ) { }

    ngOnInit(): void {
      const { user_permission_code } = this.authenticationService.getUserValue
      this.user = { ...this.data }
      console.log(this.data)
      delete this.user.user_id
      delete this.user.column_no
      delete this.user.column_permission
      this.rows = Object.keys(this.user)

      this.createFormControls()

      this.isViewing = this.type === 'view' || this.type === 'edit'
      this.isEditable = this.type === 'edit' && (user_permission_code === '99')
      this.isCreating = this.type === 'create'
  }

  saveUser() {
      const editUserInfo = this.editUserFormGroup.getRawValue()
      console.log(editUserInfo)
      this.manageUserService.editUser(editUserInfo).subscribe((res) => {
          if (res.code === 0) {
              this.toastService.show(`Cập nhật thông tin người dùng thành công`, 'Thông báo', {
                  status: 'primary',
                  position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
              })
          } else {
              this.toastService.show(`Xóa tài khoản thất bại`, 'Thông báo', {
                  status: 'danger',
                  position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
              })
          }
          this.nbDialogRef.close({ data: res.data })
      })
  }

  editUser() {
      this.isViewing = false
      this.isEditing = true
      this.isCreating = false
  }

  createUser() {
      const {
          column_id,
          column_username,
          column_password,
          column_fullname,
          column_email,
          column_phone,
          column_permission_code,
      } = this.editUserFormGroup.getRawValue()
      console.log(this.editUserFormGroup.getRawValue())
      const newUser = {
          column_id,
          column_username,
          column_password,
          column_fullname,
          column_email,
          column_phone,
          column_permission_code,
      }
      if (!this.editUserFormGroup.valid) {
          this.toastService.show('Tài khoản và mật khẩu là bắt buộc!', 'Thông báo', {
              status: 'danger',
              position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
          })

          return
      }
      this.manageUserService.createUser(newUser).subscribe((res) => {
          if (res.code === 0) {
              this.toastService.show(`Tạo mới tài khoản thành công`, 'Thông báo', {
                  status: 'primary',
                  position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
              })
              this.nbDialogRef.close({ data: res.data })
          }
          if (res.code === 5) {
              this.toastService.show(`Tài khoản đã tồn tại`, 'Thông báo', {
                  status: 'danger',
                  position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
              })
          }
      })
  }

  translate(property_name = '') {
      switch (property_name) {
          case 'column_password':
              this.inputType = 'password'
              this.isReadOnly = false
              break
          case 'column_username':
              ; ``
              if (this.isCreating) {
                  this.isReadOnly = false
              } else {
                  this.isReadOnly = true
              }
              break

          default:
              this.inputType = 'text'
              break
      }
      return this.realUserProperties[this.fakeUserProperties.indexOf(property_name)]
  }

  createFormControls() {
      this.rows.forEach((e) => {
          if (e.column_username || e.column_password) {
              this.editUserFormGroup.addControl(
                  e,
                  new FormControl(this.user[e], {
                      validators: Validators.required,
                  })
              )
          }
          this.editUserFormGroup.addControl(e, new FormControl(this.user[e]))
      })
      let index = 0
  }

  deleteUser() {
      const dialogRef = this.dialogService.open(MessageDialogComponent, { context: { message: `Bạn có chắc chắn muốn xóa tài khoản này?` } })
      dialogRef.onClose.subscribe((res) => {
          const { confirm } = res
          if (confirm) {
              this.manageUserService.deleteUser(this.data.column_username).subscribe((res) => {
                  if (res.code === 0) {
                      this.toastService.show(`Xóa tài khoản thành công`, 'Thông báo', {
                          status: 'primary',
                          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
                      })
                  } else {
                      this.toastService.show(`Xóa tài khoản thất bại`, 'Thông báo', {
                          status: 'danger',
                          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
                      })
                  }
                  this.nbDialogRef.close({ data: res.data })
              })
          }
      })

  }

}

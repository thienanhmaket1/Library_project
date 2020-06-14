// import { testUsers } from 'src/common/data';
import { UserDetailComponent } from './../../component/user-detail/user-detail.component';
import { AuthenticationService } from './../../authentication/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { NbTreeGridDataSource, NbSortDirection, NbTreeGridDataSourceBuilder, NbDialogService, NbSortRequest } from '@nebular/theme';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],providers: [UserService],
})
export class UserComponent implements OnInit {

  filterFormGroup = new FormGroup({
    searchFormControl: new FormControl(''),
  })

  users = []
  labelPosition = 'end'

  allColumns = [
    'column_id',
    'column_username',
    'column_fullname',
    'column_email',
    'column_phone',
    'column_permission',
  ]
      allColumnsRealNames = ['Mã', 'Tài khoản', 'Họ và tên', 'Email', 'Số điện thoại', 'Quyền truy cập']

    dataSource: NbTreeGridDataSource<any>

    sortColumn: string
    sortDirection: NbSortDirection = NbSortDirection.NONE

    data = []


    constructor(
        private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>,
        private nbDialogService: NbDialogService,
        private manageUserService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.getUser.subscribe((res) => {
            this.getUserList(false)
        })
    }

    getUserList(isNeedToFilter: boolean) {
      this.manageUserService.getUserList().subscribe((res) => {
          console.log(res.data)
          this.convertToUsableUsers(res.data)
          this.searchUser()
      })
  }

  

  ngOnInit(): void {
  }

  convertToUsableUsers(listUser) {
    let no = 0
    this.users = listUser.map((e) => {
        no += 1

        let permission_name
        switch (e.user_permission_code) {
            case '01':
                permission_name = 'Người dùng'
                break

            default:
                permission_name = 'Quản trị viên'
                break
        }

        return {
            data: {
                column_id: e.user_id,
                column_username: e.user_username,
                column_password: e.user_password,
                column_fullname: e.user_fullname,
                column_email: e.user_email,
                column_phone: e.user_phone,
                column_permission: permission_name,
                column_permission_code: e.user_permission_code,
            },
        }
    })
}
  searchUser() {
      const { searchFormControl } = this.filterFormGroup.getRawValue()
      if (searchFormControl) {
          this.data = this.users.filter((e) => {
              const idSearch = e.data.column_id.includes(searchFormControl)
              const usernameSearch = e.data.column_username.includes(searchFormControl)
              const fullnameSearch = e.data.column_fullname.includes(searchFormControl)
              const emailSearch = e.data.column_email.includes(searchFormControl)
              const phoneSearch = e.data.column_phone.includes(searchFormControl)

              return idSearch || usernameSearch || fullnameSearch || emailSearch || phoneSearch
          })
      } else {
          this.data = this.users
      }

      this.dataSource = this.dataSourceBuilder.create(this.data)
  }

  createRealColumns(flagColumnName = '') {
      return this.allColumnsRealNames[this.allColumns.indexOf(flagColumnName)]
  }

  updateSort(sortRequest: NbSortRequest): void {
      this.sortColumn = sortRequest.column
      this.sortDirection = sortRequest.direction
  }

  getSortDirection(column: string): NbSortDirection {
      if (this.sortColumn === column) {
          return this.sortDirection
      }
      return NbSortDirection.NONE
  }

  getShowOn(index: number) {
      const minWithForMultipleColumns = 400
      const nextColumnStep = 100
      return minWithForMultipleColumns + nextColumnStep * index
  }

  openDetail(user) {
      this.nbDialogService.open(UserDetailComponent, { context: { data: user, type: 'edit' } }).onClose.subscribe((res) => {
          this.getUserList(false)
      })
  }

  addUser() {
      const user = {
          column_id: '',
          column_username: '',
          column_password: '',
          column_fullname: '',
          column_email: '',
          column_phone: '',
          column_permission: '',
          column_permission_code: '01',

      }

      this.nbDialogService.open(UserDetailComponent, { context: { data: user, type: 'create' } }).onClose.subscribe((res) => {
          this.users = this.users.concat([{ data: res.data }])
          this.data = this.users
          this.getUserList(false)
      })
  }

  applyNewData(data) {
      this.dataSource = this.dataSourceBuilder.create(data)
  }

}


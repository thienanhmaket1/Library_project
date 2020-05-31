import { dateTimeInString } from './../common/functions';
import { permission } from './../common/constants';
import { UserService } from './service/user.service';
import { AuthenticationService } from './authentication/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { NbThemeService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Quản lý Thư viện'
  now = Date.now()
    user: any = ''
    permissionInfo
    name

    public profileChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    constructor(
        private themeService: NbThemeService,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private nbDialogService: NbDialogService
    ) {
        setInterval(() => {
            this.now = Date.now()
        }, 1000)

        this.authenticationService.getUser.subscribe((res) => {
            this.user = res
            if (this.user) {
                const { user_firstname, user_lastname, user_permission_code } = this.user
                this.name = `${user_firstname} ${user_lastname}`
                this.permissionInfo = permission.find((e) => e.permission_code === user_permission_code)
                this.themeService.changeTheme('dark')
            }
        })
    }

    ngAfterViewInit() {
        document.getElementById('div-main-layout').style.height = `${window.innerHeight - 76 - 50 - 5 - 5}px`
    }

    dateTimeInString(date) {
        return dateTimeInString(date, 'YYYY/MM/DD HH:mm:ss')
    }
}

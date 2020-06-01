import { SharedService } from './../../service/shared.service';
import { AuthenticationService } from './../../authentication/authentication.service';
import { Router } from '@angular/router';
import { adminItems, defaultTopItems, defaultBottomItems, usernormalItems } from './../../../common/constants';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuStatus
  adminItems: NbMenuItem[] = adminItems
  usernormalItems: NbMenuItem[] = usernormalItems
  items = []

  constructor(private nbMenuService: NbMenuService, private router: Router, private authService: AuthenticationService, private sharedService: SharedService) {
    this.sharedService.getMenuStatus().subscribe((res) => {
        this.menuStatus = res
    })
    this.nbMenuService.onItemClick().subscribe((res: any) => {
        const {
            item: { id },
        } = res

        if (id === 'log_out') {
            this.authService.logout(true)
        }
    })

    this.changeToNormalMode()
  }

  changeToNormalMode() {
              const { user_permission_code } = this.authService.getUserValue
              console.log(this.authService.getUserValue)
        switch (user_permission_code) {
            case '01':
                this.items = this.usernormalItems
                break
            default:
                this.items = this.adminItems
                break
        }


    // this.items = adminItems
    this.items = [...defaultTopItems, ...this.items, ...defaultBottomItems]
    this.sharedService.setMenuStatus('normal')
    }

changeToMiniMode() {
    let newItems = []
    this.items.forEach((e) => {
        const hasChildren = !!e.children
        if (hasChildren) {
            const newChildren = e.children.map((e1) => {
                return {
                    ...e1,
                    title: '',
                }
            })
            newItems = newItems.concat(newChildren)
            return
        }

        newItems.push({
            ...e,
            title: '',
        })
    })

    this.items = newItems

    this.sharedService.setMenuStatus('mini')
}


  ngOnInit(): void {
  }

}

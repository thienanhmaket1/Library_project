
import { defaultMessageConfig } from '../../common/constants';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { dateTimeInString } from 'src/common/functions';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private menuStatus: BehaviorSubject<string> = new BehaviorSubject('normal')
  constructor(private nbToastrService: NbToastrService) {}

  setMenuStatus(newMenuStatus) {
      this.menuStatus.next(newMenuStatus)
  }

  getMenuStatus() {
      return this.menuStatus
  }

  showMessage(config) {
      const newConfig = {
          ...defaultMessageConfig,
          ...config,
      }
      let position = NbGlobalPhysicalPosition.BOTTOM_RIGHT

      switch (newConfig.position) {
          case 4:
              position = NbGlobalPhysicalPosition.BOTTOM_RIGHT
              break

          case 3:
              position = NbGlobalPhysicalPosition.BOTTOM_LEFT
              break

          case 2:
              position = NbGlobalPhysicalPosition.TOP_RIGHT
              break

          case 1:
              position = NbGlobalPhysicalPosition.TOP_LEFT
              break

          default:
              position = NbGlobalPhysicalPosition.BOTTOM_RIGHT
              break
      }

      this.nbToastrService.show(newConfig.content, newConfig.title, {
          status: newConfig.status,
          position,
          duration: newConfig.duration,
      })
  }

  dateTimeInString(dateTime) {
      return dateTimeInString(dateTime)
  }
}
